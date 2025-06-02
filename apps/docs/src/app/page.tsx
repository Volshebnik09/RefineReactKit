"use client";
import {
  ButtonComponents,
  DraggableComponents,
  FlexComponents,
  RadioComponents,
  TextComponents,
} from "@/widgets/UIBlocks";
import InputBlocks from "@/widgets/UIBlocks/InputBlocks";
import { Flex, Panel, Text, useThemeValue } from "@refine-react-kit/ui";
import Link from "next/link";

export default function page() {
  return (
    <Flex column style={{ minHeight: "100vh" }} align-stretch>
      <Panel>
      <Flex justify-between align-center>
        <Text.Span style={{
          fontSize: useThemeValue("fontSize.xl")
        }}>Refine react kit</Text.Span>
        <Link href={"https://github.com/Volshebnik09/RefineReactKit"}>
          <Text.Span>
            Github
          </Text.Span>
        </Link>
      </Flex>
      </Panel>
      <Flex style={{ flex: 1 }} align-stretch no-wrap>
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
            <Link href="#text" style={{ textDecoration: "none" }}>
              <Text.Span>Текст</Text.Span>
            </Link>
            <Link href="#input" style={{ textDecoration: "none" }}>
              <Text.Span>Компоненты ввода</Text.Span>
            </Link>
            <Link href="#button" style={{ textDecoration: "none" }}>
              <Text.Span>Кнопки</Text.Span>
            </Link>
            <Link href="#radio" style={{ textDecoration: "none" }}>
              <Text.Span>Radio</Text.Span>
            </Link>
            <Link href="#draggable" style={{ textDecoration: "none" }}>
              <Text.Span>Drag & Drop</Text.Span>
            </Link>
            <Link href="#flex" style={{ textDecoration: "none" }}>
              <Text.Span>Flex</Text.Span>
            </Link>
            <Link href="/form-example" style={{ textDecoration: "none" }}>
              <Text.Span>Пример формы</Text.Span>
            </Link>
          </Flex>
        </Panel>
        <Panel style={{ flex: 1 }}>
        <Flex column gap={12}>
            <Text.H2 id="text">Текст</Text.H2>
            <TextComponents />
            <Text.H2 id="input">Компоненты ввода</Text.H2>
            <InputBlocks />
            <Text.H2 id="radio">Radio</Text.H2>
            <RadioComponents.DefaultRadio />
            <RadioComponents.BlockRadio />
            <Text.H2 id="button">Кнопки</Text.H2>
            <ButtonComponents />
            <Text.H2 id="draggable">Drag & Drop</Text.H2>
            <DraggableComponents.Default />
            <Text.H2 id="flex">Flex</Text.H2>
            <FlexComponents.FlexPositions />
          </Flex>
        </Panel>
      </Flex>
    </Flex>
  );
}
