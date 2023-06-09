import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
} from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { THEME } from "../../styles/theme";
import { styles } from "./styles";

const TYPE_COLORS = {
  EASY: THEME.COLORS.BRAND_LIGHT,
  MEDIUM: THEME.COLORS.WARNING_LIGHT,
  HARD: THEME.COLORS.DANGER_LIGHT,
};

type Props = TouchableOpacityProps & {
  title: string;
  isChecked?: boolean;
  type?: keyof typeof TYPE_COLORS;
};

export function Level({
  title,
  type = "EASY",
  isChecked = false,
  ...rest
}: Props) {
  const scale = useSharedValue(1);
  const animetedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const COLOR = TYPE_COLORS[type];

  return (
    <TouchableOpacity {...rest}>
      <Animated.View
        style={[
          styles.container,
          animetedContainerStyle,
          {
            borderColor: COLOR,
            backgroundColor: isChecked ? COLOR : "transparent",
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            { color: isChecked ? THEME.COLORS.GREY_100 : COLOR },
          ]}
        >
          {title}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}
