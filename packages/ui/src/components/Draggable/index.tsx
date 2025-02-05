import React, {useEffect} from "react";
import {Store, useStore} from "@tanstack/react-store";
import styled from "@emotion/styled";

type TDragItemProps<TData=undefined> = {
    children?: React.ReactNode,
    data: TData
    store:TStore<TData>
}

type TWindowVeilProps <TData=undefined>= {
    store:TStore<TData>
}

const WindowVeil = <TData=undefined>(props: {
    store:TStore<TData>
}) => {
    const isDragging = useStore(props.store, (state)=> state.isDragging)

    return <div
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 999998,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            pointerEvents: "none",
            opacity: isDragging ? 1 : 0,
            transition: '0.5s ease'
        }}
    />
}

const StyledDragItem = styled.div(props=>{
    return {
        cursor: 'grab'
    }
})


const DragItem = <TData=undefined>(props: TDragItemProps<TData>) => {
    return <>
        <StyledDragItem
            onDragStart={(e) => {
                props.store.setState((data)=>({
                    ...data,
                    isDragging: true
                }))
                props.store.setState((data)=>({
                    ...data,
                    draggedData: props.data
                }))
            }}
            onDragEnd={(e) => {
                props.store.setState((data)=>({
                    ...data,
                    isDragging: false
                }))
            }}
            draggable={true}
        >
            {props.children}
        </StyledDragItem>
    </>

}

type TDragDropZoneProps<TData = undefined> = {
    children?: React.ReactNode
    onDrop?: (data: TData) => void
    store:TStore<TData>
}

type TStyledDropZoneProps = {
    highlighted?: boolean
}

const StyledDropZone = styled.div<TStyledDropZoneProps>(props=>{
    return {
        position: 'relative',
        zIndex: props.highlighted ? 999999 : 'unset'
    }
})

const DragDropZone = <TData = undefined>(props: TDragDropZoneProps<TData>) => {
    const isDragging = useStore(props.store, (state)=> state.isDragging)
    const data = useStore(props.store, (state)=> state.draggedData)
    const dropZoneRef = React.useRef<HTMLDivElement>(null)


    useEffect(()=>{
        const onDrop = (e: DragEvent) => {
            const dropTarget = e.target as HTMLElement

            if (!dropZoneRef.current?.contains(dropTarget)) {
                return
            }

            props.onDrop?.(data)
        }

        const onDragOver = (e: DragEvent) => {
            e.preventDefault()
        }

        if(props.onDrop){
            document.addEventListener('drop', onDrop)
            document.addEventListener('dragover', onDragOver)
        }

        return ()=>{
            document.removeEventListener('drop', onDrop)
            document.removeEventListener('dragover', onDragOver)
        }

    }, [props.onDrop, data])


    return <StyledDropZone highlighted={isDragging} ref={dropZoneRef}>
        {props.children}
    </StyledDropZone>
}

type TStoreData<TData> = {
    isDragging: boolean,
    draggedData: TData
}

type TStore<TData> = Store<TStoreData<TData>>

const createDragAndDropZoneGroup = <TData = any>() => {
    const refsStore = new Store<TStoreData<TData>>({
        isDragging: false,
        draggedData: undefined as TData
    })

    const Item = (props: Omit<TDragItemProps<TData>, 'store'>) => DragItem<TData>({...props, store: refsStore})
    const DropZone = (props: Omit<TDragDropZoneProps<TData>, 'store'>) => DragDropZone({...props, store: refsStore})
    const Veil  = (props: Omit<TWindowVeilProps<TData>, 'store'>) => WindowVeil<TData>({...props, store: refsStore})

    return {
        Veil,
        DropZone,
        Item,
    }
}


export {
    createDragAndDropZoneGroup,
    DragItem,
    DragDropZone
}
