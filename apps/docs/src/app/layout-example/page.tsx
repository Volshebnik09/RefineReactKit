"use client";
import {
  ButtonComponents,
  DraggableComponents,
  FlexComponents,
  RadioComponents,
  TextComponents,
} from "@/widgets/UIBlocks";
import InputBlocks from "@/widgets/UIBlocks/InputBlocks";
import { Flex, Panel, Text } from "@refine-react-kit/ui";

export default function page() {
  return (
    <Flex column style={{ minHeight: "100vh" }} align-stretch>
      {/* Top Bar */}
      <Panel
        style={{
          height: 60,
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
        }}
      >
        <Text.H4>Refined react kit</Text.H4>
      </Panel>
      <Flex style={{ flex: 1 }} align-stretch no-wrap>
        {/* Sidebar */}
        <Panel
          style={{
            width: 220,
            background: "#f5f5f5",
          }}
        >
          <Flex
            column
            gap={12}
            style={{
              position: "sticky",
              top: 20,
            }}
          >
            <a href="#input" style={{ textDecoration: "none" }}>
              <Text.Span>Компоненты ввода</Text.Span>
            </a>
            <a href="#draggable" style={{ textDecoration: "none" }}>
              <Text.Span>Drag & Drop</Text.Span>
            </a>
            <a href="#radio" style={{ textDecoration: "none" }}>
              <Text.Span>Radio</Text.Span>
            </a>
            <a href="#button" style={{ textDecoration: "none" }}>
              <Text.Span>Кнопки</Text.Span>
            </a>
            <a href="#text" style={{ textDecoration: "none" }}>
              <Text.Span>Текст</Text.Span>
            </a>
            <a href="#flex" style={{ textDecoration: "none" }}>
              <Text.Span>Flex</Text.Span>
            </a>
          </Flex>
        </Panel>
        {/* Main Content */}
        <Panel style={{ flex: 1 }}>
          <Flex column gap={12}>
            <Text.H2 id="input">Компоненты ввода</Text.H2>
            <InputBlocks />
            <Text.H2 id="draggable">Drag & Drop</Text.H2>
            <DraggableComponents.Default />
            <Text.H2 id="radio">Radio</Text.H2>
            <RadioComponents.DefaultRadio />
            <RadioComponents.BlockRadio />
            <Text.H2 id="button">Кнопки</Text.H2>
            <ButtonComponents />
            <Text.H2 id="text">Текст</Text.H2>
            <TextComponents />
            <Text.H2 id="flex">Flex</Text.H2>
            <FlexComponents.FlexPositions />
          </Flex>
        </Panel>
      </Flex>
    </Flex>
  );
}
