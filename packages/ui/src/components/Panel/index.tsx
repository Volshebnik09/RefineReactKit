import styled from "@emotion/styled";
import { getThemeValue } from "@/theme/Theme.js";

const Panel = styled.div((props) => {
  const padding = getThemeValue(props.theme, "spacing.md");
  const backgroundColor = getThemeValue(props.theme, "colors.background.panel");
  const shadows = getThemeValue(props.theme, "shadows.sm");
  return {
    width: "100%",
    borderRadius: "8px",
    padding: padding,
    border: "1px solid #e0e0e0",
    boxSizing: "border-box",
    backgroundColor: backgroundColor,
    boxShadow: shadows,
  };
});

export { Panel };
