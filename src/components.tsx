import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "./Icon";
import { colors, coverBg, fonts, shadow } from "./theme";

/* ---------------- Status bar (mock iOS status) ---------------- */
export function StatusBar({ color = colors.ink }: { color?: string }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.status, { paddingTop: insets.top + 6 }]}>
      <Text style={[s.statusTime, { color }]}>9:41</Text>
      <View style={s.statusIcons}>
        <Icon name="signal" size={15} color={color} />
        <Icon name="wifi" size={15} color={color} />
        <Icon name="battery" size={20} color={color} />
      </View>
    </View>
  );
}

/* ---------------- Brand ---------------- */
export function Brand({ size = "md" }: { size?: "md" | "lg" }) {
  const mark = size === "lg" ? 36 : 28;
  const fs = size === "lg" ? 24 : 19;
  const word = size === "lg" ? 26 : 22;
  return (
    <View style={s.brandRow}>
      <View style={[s.brandMark, { width: mark, height: mark, borderRadius: 9 }]}>
        <Text style={[s.brandM, { fontSize: fs }]}>m</Text>
      </View>
      <Text style={[s.brandWord, { fontSize: word }]}>morrow</Text>
    </View>
  );
}

/* ---------------- Book cover ---------------- */
export function BookCover({
  title,
  author,
  color = "amber",
  width,
  height,
  motif = "left",
}: {
  title: string;
  author: string;
  color?: keyof typeof coverBg;
  width: number;
  height: number;
  motif?: "left" | "right";
}) {
  const circle = height * 0.52;
  return (
    <View
      style={[
        s.cover,
        shadow,
        { width, height, backgroundColor: coverBg[color] },
      ]}
    >
      <View
        style={{
          position: "absolute",
          width: circle,
          height: circle,
          borderRadius: circle / 2,
          backgroundColor: "rgba(255,253,248,0.7)",
          top: -height * 0.1,
          left: motif === "right" ? width - circle * 0.75 : width * 0.28,
        }}
      />
      <View style={s.coverInner}>
        <Text style={s.coverTitle} numberOfLines={3}>
          {title}
        </Text>
        <Text style={s.coverAuthor} numberOfLines={2}>
          {author}
        </Text>
      </View>
    </View>
  );
}

/* ---------------- Button ---------------- */
export function Button({
  children,
  onPress,
  variant = "primary",
  icon,
  disabled = false,
  style,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: "primary" | "outline" | "dark";
  icon?: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
}) {
  const bg =
    variant === "primary"
      ? colors.amber
      : variant === "dark"
      ? colors.ink
      : colors.paper;
  const fg = variant === "outline" ? colors.ink : variant === "dark" ? colors.paper : colors.ink;
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        s.button,
        { backgroundColor: bg, opacity: disabled ? 0.4 : pressed ? 0.9 : 1 },
        variant === "outline" && s.buttonOutline,
        style,
      ]}
    >
      {icon}
      <Text style={[s.buttonText, { color: fg }]}>{children}</Text>
    </Pressable>
  );
}

/* ---------------- Field ---------------- */
export function Field({
  label,
  value,
  onChangeText,
  icon,
  secure,
  placeholder,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  icon: React.ReactNode;
  secure?: boolean;
  placeholder?: string;
}) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={s.fieldLabel}>{label}</Text>
      <View style={s.field}>
        {icon}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secure}
          placeholder={placeholder}
          placeholderTextColor={colors.soft}
          style={s.fieldInput}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
}

/* ---------------- Layered books illustration ---------------- */
export function LayeredBooks({ width = 286 }: { width?: number }) {
  const scale = width / 286;
  const H = 290 * scale;
  const C = ({ x, y, w, h, color, opacity = 1, motif = "left", title, author }: any) => {
    const circle = h * 0.52;
    return (
      <View
        style={[
          s.cover,
          shadow,
          {
            position: "absolute",
            left: x * scale,
            top: y * scale,
            width: w * scale,
            height: h * scale,
            backgroundColor: coverBg[color as keyof typeof coverBg],
            opacity,
          },
        ]}
      >
        <View
          style={{
            position: "absolute",
            width: circle * scale,
            height: circle * scale,
            borderRadius: (circle * scale) / 2,
            backgroundColor: "rgba(255,253,248,0.7)",
            top: -h * 0.12 * scale,
            left: motif === "right" ? (w - circle * 0.8) * scale : w * 0.28 * scale,
          }}
        />
        <View style={[s.coverInner, { padding: 12 * scale }]}>
          <Text style={[s.coverTitle, { fontSize: 16 * scale }]} numberOfLines={3}>
            {title}
          </Text>
          <Text style={[s.coverAuthor, { fontSize: 8 * scale }]} numberOfLines={2}>
            {author}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ width, height: H }}>
      <View
        style={{
          position: "absolute",
          left: 25 * scale,
          top: 31 * scale,
          width: 236 * scale,
          height: 236 * scale,
          borderRadius: 118 * scale,
          backgroundColor: "rgba(255,240,200,0.7)",
        }}
      />
      <C x={30.27} y={32.68} w={144.07} h={185.66} color="lilac" opacity={0.58} motif="right" title="The Art of Noticing" author="Rob Walker" />
      <C x={112} y={65.46} w={139.12} h={182.93} color="coral" opacity={0.72} title="Small Pleasures" author="The School of Life" />
      <C x={82} y={69} w={122} h={180} color="amber" title="A Field Guide to Wonder" author="S. Holloway" />
    </View>
  );
}

/* ---------------- Bottom nav ---------------- */
const TABS = [
  { id: "library", label: "Library", icon: "book" },
  { id: "catalog", label: "Discover", icon: "compass" },
  { id: "profile", label: "Profile", icon: "user-round" },
] as const;

export function BottomNav({
  active,
  onChange,
  showProfile = true,
}: {
  active: string;
  onChange: (id: string) => void;
  showProfile?: boolean;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.nav, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      {TABS.map((t) => {
        if (t.id === "profile" && !showProfile) return null;
        const on = t.id === active;
        return (
          <Pressable key={t.id} style={s.navItem} onPress={() => onChange(t.id)}>
            <Icon name={t.icon} size={20} color={on ? colors.ink : colors.soft} />
            <Text style={[s.navLabel, on && s.navLabelOn]}>{t.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  status: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 6,
  },
  statusTime: { fontSize: 13 },
  statusIcons: { flexDirection: "row", alignItems: "center", gap: 5 },

  brandRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  brandMark: { backgroundColor: colors.amber, alignItems: "center", justifyContent: "center" },
  brandM: { fontFamily: fonts.serif, color: colors.ink, marginTop: -2 },
  brandWord: { fontFamily: fonts.serif, color: colors.ink },

  cover: { borderRadius: 6, overflow: "hidden" },
  coverInner: { flex: 1, justifyContent: "space-between", padding: 12 },
  coverTitle: { fontFamily: fonts.serif, color: colors.ink, lineHeight: 17 },
  coverAuthor: { fontFamily: fonts.sans, fontSize: 8, letterSpacing: 0.5, color: "rgba(24,34,56,0.7)", textTransform: "uppercase" },

  button: {
    height: 52,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 24,
  },
  buttonOutline: { borderWidth: 1, borderColor: colors.line },
  buttonText: { fontFamily: fonts.sans, fontSize: 15 },

  fieldLabel: { fontFamily: fonts.sansBold, fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: colors.soft },
  field: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.paper,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
  },
  fieldInput: { flex: 1, fontFamily: fonts.sans, fontSize: 15, color: colors.ink },

  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: colors.line,
    backgroundColor: colors.paper,
    paddingTop: 10,
    paddingHorizontal: 30,
  },
  navItem: { width: 72, alignItems: "center", gap: 6 },
  navLabel: { fontFamily: fonts.sansMedium, fontSize: 10, color: colors.soft },
  navLabelOn: { fontFamily: fonts.sansBold, color: colors.ink },
});
