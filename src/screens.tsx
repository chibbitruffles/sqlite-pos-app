import React, { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BookCover,
  BottomNav,
  Brand,
  Button,
  Field,
  LayeredBooks,
  StatusBar,
} from "./components";
import Icon from "./Icon";
import { colors, fonts, shadow } from "./theme";
import { CATALOG, CURRENTLY_READING, FILTERS, GENRES } from "./data";
import { useApp } from "./store";

/* ================= Splash ================= */
export function Splash() {
  const { go } = useApp();
  useEffect(() => {
    const t = setTimeout(() => go("welcome"), 1800);
    return () => clearTimeout(t);
  }, [go]);
  return (
    <Pressable style={st.fill} onPress={() => go("welcome")}>
      <View style={st.splashWash} />
      <View style={st.splashGlow} />
      <StatusBar />
      <View style={st.splashBody}>
        <View style={{ alignItems: "center", gap: 18, marginTop: 60 }}>
          <Brand size="lg" />
          <Text style={st.splashTag}>A quieter place for every book you love.</Text>
        </View>
        <View style={{ width: 248, height: 232 }}>
          <View style={[st.page, { left: 14, top: 28, borderTopLeftRadius: 22, borderBottomLeftRadius: 22 }]} />
          <View style={[st.page, { left: 104, top: 42, borderTopRightRadius: 22, borderBottomRightRadius: 22 }]} />
          <Text style={st.splashM}>m</Text>
        </View>
        <Text style={st.eyebrowSoft}>Opening your next chapter</Text>
      </View>
    </Pressable>
  );
}

/* ================= Welcome ================= */
export function Welcome() {
  const { go } = useApp();
  return (
    <View style={st.fill}>
      <StatusBar />
      <View style={st.topbar}>
        <Brand />
        <Pressable onPress={() => go("signin")}>
          <Text style={st.semiboldSoft}>Skip</Text>
        </Pressable>
      </View>
      <View style={st.onboardBody}>
        <LayeredBooks width={286} />
        <View style={{ alignItems: "center", gap: 20, marginTop: 24 }}>
          <View style={st.dots}>
            <View style={st.dotOnWide} />
            <View style={st.dot} />
            <View style={st.dot} />
          </View>
          <View style={{ alignItems: "center", gap: 8 }}>
            <Text style={st.eyebrow}>Your reading life, gathered</Text>
            <Text style={st.h1Center}>Meet your shelf for tomorrow.</Text>
            <Text style={st.bodySoft}>
              Save what catches your eye, remember what moved you, and always know
              what to read next.
            </Text>
          </View>
        </View>
        <View style={{ gap: 12, marginTop: 16 }}>
          <Button onPress={() => go("customization")}>Begin your library</Button>
          <Text style={st.tinySoftCenter}>
            No pressure. You can change everything later.
          </Text>
        </View>
      </View>
    </View>
  );
}

/* ================= Customization ================= */
export function Customization() {
  const { go, selectedGenres, toggleGenre } = useApp();
  const count = selectedGenres.length;
  return (
    <View style={st.fill}>
      <StatusBar />
      <View style={st.navRow}>
        <Pressable onPress={() => go("welcome")}>
          <Icon name="arrow-left" size={22} />
        </Pressable>
        <View style={{ flexDirection: "row", gap: 6 }}>
          <View style={st.dot} />
          <View style={st.dotOn} />
          <View style={st.dot} />
        </View>
        <Text style={st.semiboldSoft}>2 of 3</Text>
      </View>
      <ScrollView contentContainerStyle={st.scrollBody}>
        <View style={{ gap: 10 }}>
          <Text style={st.eyebrow}>Tune your shelves</Text>
          <Text style={st.h1}>What keeps you turning pages?</Text>
          <Text style={st.bodySoft}>
            Choose at least three. We'll shape your catalog around them — not trap
            you in a bubble.
          </Text>
        </View>
        <View style={st.chips}>
          {GENRES.map((g) => {
            const on = selectedGenres.includes(g.id);
            return (
              <Pressable
                key={g.id}
                onPress={() => toggleGenre(g.id)}
                style={[st.chip, on ? st.chipOn : st.chipOff]}
              >
                <Icon name={g.icon} size={14} />
                <Text style={st.chipText}>{g.label}</Text>
                {on && <Icon name="check" size={14} />}
              </Pressable>
            );
          })}
        </View>
        <View style={{ gap: 16, marginTop: 24 }}>
          <View style={st.summary}>
            <Text style={st.bodySoft}>
              <Text style={st.boldInk}>{count} selected</Text> · lovely range
            </Text>
            <Text style={st.eyebrow}>Just right</Text>
          </View>
          <Button disabled={count < 3} onPress={() => go("referral")}>
            Shape my library
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

/* ================= Referral ================= */
export function Referral() {
  const { go } = useApp();
  const [copied, setCopied] = useState(false);
  return (
    <View style={st.fill}>
      <StatusBar />
      <View style={st.navRow}>
        <Pressable onPress={() => go("customization")}>
          <Icon name="arrow-left" size={22} />
        </Pressable>
        <View style={{ flexDirection: "row", gap: 6 }}>
          <View style={st.dot} />
          <View style={st.dot} />
          <View style={st.dotOn} />
        </View>
        <Pressable onPress={() => go("signin")}>
          <Text style={st.semiboldSoft}>Later</Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={st.scrollBody}>
        <View style={{ gap: 10 }}>
          <Text style={st.eyebrow}>A good story travels</Text>
          <Text style={st.h1}>Read together. Earn little joys.</Text>
          <Text style={st.bodySoft}>
            Invite a friend to Morrow. When they add their first book, you both
            unlock a month of Plus.
          </Text>
        </View>
        <View style={st.ticket}>
          <View style={st.ticketCircle1} />
          <View style={st.ticketCircle2} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={st.avatarCoral} />
            <View style={st.giftPill}>
              <Icon name="gift" size={20} color={colors.amberDeep} />
            </View>
            <View style={st.avatarTeal} />
          </View>
          <View style={{ alignItems: "center", gap: 4 }}>
            <Text style={st.ticketValue}>1 month</Text>
            <Text style={st.bodySoft}>of Morrow Plus, for you both</Text>
          </View>
          <Pressable style={st.codeRow} onPress={() => setCopied(true)}>
            <Text style={st.codeText}>MORROW-ELLA</Text>
            {copied ? (
              <Text style={st.eyebrow}>Copied</Text>
            ) : (
              <Icon name="copy" size={17} color={colors.soft} />
            )}
          </Pressable>
        </View>
        <View style={{ alignItems: "center", gap: 12, marginTop: 24 }}>
          <Button onPress={() => go("signin")} icon={<Icon name="send" size={16} />}>
            Invite a reading friend
          </Button>
          <Text style={st.eyebrowSoft}>One reward per friend · Cancel anytime</Text>
        </View>
      </ScrollView>
    </View>
  );
}

/* ================= Sign in ================= */
export function SignIn() {
  const { signIn, go } = useApp();
  const [email, setEmail] = useState("ella@papertrail.co");
  const [password, setPassword] = useState("password");
  const [remember, setRemember] = useState(true);
  const canSubmit = email.includes("@") && password.length > 0;
  return (
    <View style={[st.fill, { backgroundColor: colors.cream }]}>
      <StatusBar />
      <View style={st.topbar}>
        <Pressable onPress={() => go("welcome")}>
          <Icon name="x" size={22} />
        </Pressable>
        <Brand />
        <View style={{ width: 22 }} />
      </View>
      <ScrollView contentContainerStyle={st.scrollBody}>
        <View style={{ alignItems: "center", marginTop: 8 }}>
          <LayeredBooks width={220} />
        </View>
        <View style={{ alignItems: "center", gap: 8 }}>
          <Text style={st.h1Center30}>Welcome back, reader.</Text>
          <Text style={st.bodySoftCenter}>
            Sign in to continue building your personal library.
          </Text>
        </View>
        <View style={{ gap: 14, marginTop: 24 }}>
          <Field
            label="Email"
            value={email}
            onChangeText={setEmail}
            icon={<Icon name="mail" size={17} color={colors.soft} />}
          />
          <Field
            label="Password"
            value={password}
            onChangeText={setPassword}
            secure
            icon={<Icon name="lock" size={17} color={colors.soft} />}
          />
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Pressable onPress={() => setRemember((v) => !v)}>
              <Text style={st.bodySoft}>
                {remember ? "✓  " : "    "}Remember me
              </Text>
            </Pressable>
            <Text style={[st.bodySoft, { color: colors.amberDeep, fontFamily: fonts.sansSemiBold }]}>
              Forgot password?
            </Text>
          </View>
        </View>
        <View style={{ gap: 12, marginTop: 24 }}>
          <Button disabled={!canSubmit} onPress={signIn}>
            Sign in
          </Button>
          <Button variant="outline" onPress={signIn} icon={<Icon name="apple" size={17} />}>
            Continue with Apple
          </Button>
          <Text style={st.bodySoftCenter}>
            New to Morrow?{" "}
            <Text style={st.linkBold} onPress={signIn}>
              Create an account
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

/* ================= Library ================= */
function CurrentlyReadingCard() {
  const b = CURRENTLY_READING;
  const pct = Math.round((b.page / b.totalPages) * 100);
  return (
    <View style={[st.readingCard, shadow]}>
      <View style={st.readingGlow} />
      <BookCover title={b.title} author={b.author} color="amber" width={112} height={164} motif="right" />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View style={{ gap: 6 }}>
          <Text style={st.eyebrow}>Currently reading</Text>
          <Text style={st.serif23}>{b.title}</Text>
          <Text style={st.bodySoft}>{b.author}</Text>
        </View>
        <View style={{ gap: 7 }}>
          <View style={st.rowBetween}>
            <Text style={st.tinySoft}>Page {b.page} of {b.totalPages}</Text>
            <Text style={st.tinyBold}>{pct}%</Text>
          </View>
          <View style={st.track}>
            <View style={[st.trackFill, { width: `${pct}%` }]} />
          </View>
          <Text style={st.tinySoft}>About {b.minutesLeft} min left</Text>
        </View>
      </View>
    </View>
  );
}

function ShelfBook({ book }: { book: (typeof CATALOG)[number] }) {
  const palette = ["sky", "coral", "teal", "lilac", "amber"] as const;
  const color = palette[book.title.length % palette.length];
  return (
    <View style={{ width: 101, gap: 8 }}>
      <BookCover title={book.title} author={book.author} color={color} width={101} height={140} motif="right" />
      <Text style={st.tinyInk}>{book.title}</Text>
    </View>
  );
}

function EmptyLibrary({ onDiscover }: { onDiscover: () => void }) {
  return (
    <View style={st.emptyBody}>
      <View style={{ gap: 10 }}>
        <Text style={st.eyebrow}>Good morning, Ella</Text>
        <Text style={st.h1}>Your library is waiting.</Text>
      </View>
      <View style={{ height: 286, width: "100%", justifyContent: "center" }}>
        <View style={st.emptyGlow} />
        <View style={{ position: "absolute", left: 74, top: 44, opacity: 0.75 }}>
          <BookCover title="First Light" author="Mina Lee" color="sky" width={124} height={160} motif="right" />
        </View>
        <View style={st.placeholderBook} />
        <Pressable style={st.addMarker} onPress={onDiscover}>
          <Icon name="plus" size={22} />
        </Pressable>
      </View>
      <View style={{ alignItems: "center", gap: 10 }}>
        <Text style={st.serif24}>Start with one good book.</Text>
        <Text style={st.bodySoftCenter}>
          Search for a title, scan a cover, or browse something chosen for your taste.
        </Text>
      </View>
      <View style={{ gap: 10 }}>
        <Button onPress={onDiscover} icon={<Icon name="plus" size={16} />}>
          Add your first book
        </Button>
        <Button variant="outline" onPress={onDiscover} icon={<Icon name="sparkles" size={16} />}>
          Browse recommendations
        </Button>
      </View>
    </View>
  );
}

function PopulatedLibrary({ onDiscover }: { onDiscover: () => void }) {
  const { shelf, catalogById, go } = useApp();
  const books = shelf.map((id) => catalogById[id]).filter(Boolean);
  const upNext = books.slice(0, 3);
  return (
    <ScrollView contentContainerStyle={st.popBody}>
      <View style={st.rowEnd}>
        <View style={{ gap: 4 }}>
          <Text style={st.eyebrow}>Sunday, 4 October</Text>
          <Text style={st.h1_31}>Good morning, Ella.</Text>
        </View>
        <Pressable style={st.roundAmber} onPress={onDiscover}>
          <Icon name="plus" size={19} />
        </Pressable>
      </View>
      <CurrentlyReadingCard />
      <View style={{ gap: 14 }}>
        <View style={st.rowBetween}>
          <Text style={st.serif22}>Up next</Text>
          <Text style={st.linkSoft}>View all · {books.length}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 14 }}>
          {upNext.map((b) => (
            <ShelfBook key={b.id} book={b} />
          ))}
        </View>
      </View>
      <View style={st.insight}>
        <View style={{ gap: 4 }}>
          <Text style={st.serif18Paper}>{books.length} books on the shelf</Text>
          <Text style={st.tinyPaperSoft}>Two ahead of your gentle goal</Text>
        </View>
        <Icon name="trending-up" size={20} color={colors.paper} />
      </View>
    </ScrollView>
  );
}

export function Library() {
  const { shelf, go } = useApp();
  const empty = shelf.length === 0;
  return (
    <View style={st.fill}>
      <StatusBar />
      <View style={st.topbar}>
        <Brand />
        <Text style={st.eyebrow}>My library</Text>
        <Pressable style={st.roundOutline} onPress={() => go("catalog")}>
          <Icon name="search" size={18} />
        </Pressable>
      </View>
      {empty ? <EmptyLibrary onDiscover={() => go("catalog")} /> : <PopulatedLibrary onDiscover={() => go("catalog")} />}
      <BottomNav active="library" showProfile={false} onChange={(id) => go(id as any)} />
    </View>
  );
}

/* ================= Catalog ================= */
export function Catalog() {
  const { go, filter, setFilter, shelf, addBook, removeBook } = useApp();
  const books = useMemo(
    () => (filter === "For you" ? CATALOG : CATALOG.filter((b) => b.genre === filter)),
    [filter]
  );
  const palette = ["amber", "sky", "coral", "lilac", "teal"] as const;
  const toggle = (id: string) => (shelf.includes(id) ? removeBook(id) : addBook(id));
  return (
    <View style={st.fill}>
      <StatusBar />
      <View style={st.topbar}>
        <Brand />
        <Text style={st.eyebrow}>Discover</Text>
        <Pressable style={st.roundOutline}>
          <Icon name="sliders" size={18} />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={st.catalogBody}>
        <View style={{ gap: 8 }}>
          <Text style={st.eyebrow}>Curated for curious minds</Text>
          <Text style={st.h1}>Find your next idea.</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {FILTERS.map((f) => {
            const on = f === filter;
            return (
              <Pressable key={f} onPress={() => setFilter(f)} style={[st.filter, on ? st.filterOn : st.filterOff]}>
                <Text style={[st.filterText, on && { color: colors.paper }]}>{f}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
        <View style={st.rowBetween}>
          <View style={{ gap: 2 }}>
            <Text style={st.serif23}>{filter}</Text>
            <Text style={st.tinySoft}>{books.length} thoughtful picks</Text>
          </View>
          <Text style={st.linkSoft}>Popular ↓</Text>
        </View>
        <View style={st.grid}>
          {books.map((b) => {
            const color = palette[b.title.length % palette.length];
            const added = shelf.includes(b.id);
            return (
              <View key={b.id} style={st.gridItem}>
                <BookCover title={b.title} author={b.author} color={color} width={"100%" as any} height={152} motif="right" />
                <View style={{ gap: 6 }}>
                  <View style={{ gap: 2 }}>
                    <Text style={st.serif16}>{b.title}</Text>
                    <Text style={st.tinySoft}>{b.author}</Text>
                  </View>
                  <View style={st.rowBetween}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                      <Icon name="star" size={12} color={colors.amberDeep} />
                      <Text style={st.tinySoft}>{b.rating.toFixed(1)}</Text>
                    </View>
                    <Pressable
                      onPress={() => toggle(b.id)}
                      style={[st.addPill, added ? { backgroundColor: colors.line } : { backgroundColor: colors.amber }]}
                    >
                      <Text style={[st.addPillText, added && { color: colors.soft }]}>
                        {added ? "On shelf" : "Add"}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        <View style={st.editorial}>
          <View style={st.editorialIcon}>
            <Icon name="sparkles" size={20} />
          </View>
          <View style={{ flex: 1, gap: 4 }}>
            <Text style={st.eyebrow}>Editor's shelf</Text>
            <Text style={st.serif17}>Seven books for a gentler ambition</Text>
          </View>
          <Icon name="arrow-up-right" size={18} />
        </View>
      </ScrollView>
      <BottomNav active="catalog" onChange={(id) => go(id as any)} />
    </View>
  );
}

/* ================= Profile ================= */
export function Profile() {
  const { go, signOut, shelf, selectedGenres } = useApp();
  return (
    <View style={st.fill}>
      <StatusBar />
      <ScrollView contentContainerStyle={st.catalogBody}>
        <Text style={st.h1}>Profile</Text>
        <View style={st.profileCard}>
          <View style={st.avatar}>
            <Text style={st.avatarText}>E</Text>
          </View>
          <View style={{ gap: 4 }}>
            <Text style={st.serif22}>Ella</Text>
            <Text style={st.bodySoft}>ella@papertrail.co</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <View style={st.statBox}>
            <Text style={st.serif26}>{shelf.length}</Text>
            <Text style={st.eyebrow}>On shelf</Text>
          </View>
          <View style={st.statBox}>
            <Text style={st.serif26}>{selectedGenres.length}</Text>
            <Text style={st.eyebrow}>Genres</Text>
          </View>
        </View>
        <Pressable
          onPress={() => go("inventory")}
          style={[st.listRow, { borderWidth: 1, borderColor: colors.soft, borderRadius: 12, marginBottom: 12, padding: 12 }]}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Icon name="book" size={18} color={colors.soft} />
            <Text style={st.listLabel}>SQLite Inventory (Lab 05)</Text>
          </View>
          <Icon name="arrow-up-right" size={16} color={colors.soft} />
        </Pressable>
        {[
          ["bell", "Notifications"],
          ["copy", "Referral rewards"],
          ["lock", "Account & privacy"],
        ].map(([icon, label], i) => (
          <View key={label} style={[st.listRow, i > 0 && st.listRowBorder]}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Icon name={icon} size={18} color={colors.soft} />
              <Text style={st.listLabel}>{label}</Text>
            </View>
            <Icon name="arrow-up-right" size={16} color={colors.soft} />
          </View>
        ))}
        <Button variant="outline" onPress={signOut}>
          Sign out
        </Button>
      </ScrollView>
      <BottomNav active="profile" onChange={(id) => go(id as any)} />
    </View>
  );
}

/* ================= styles ================= */
const st = StyleSheet.create({
  fill: { flex: 1, backgroundColor: colors.paper },
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  rowEnd: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" },

  statusTimeHidden: {},
  splashWash: { position: "absolute", left: 0, top: 454, width: 390, height: 390, backgroundColor: "rgba(243,166,155,0.35)", borderRadius: 195 },
  splashGlow: { position: "absolute", left: 220, top: 492, width: 240, height: 240, borderRadius: 120, backgroundColor: "rgba(169,154,232,0.24)" },
  splashBody: { flex: 1, alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingBottom: 24 },
  splashTag: { width: 250, textAlign: "center", fontFamily: fonts.serif, fontSize: 24, lineHeight: 28, color: colors.ink },
  splashM: { position: "absolute", left: 64, top: 56, width: 120, textAlign: "center", fontFamily: fonts.serif, fontSize: 50, color: colors.amberDeep },
  page: { position: "absolute", width: 129, height: 161, backgroundColor: colors.white, borderRadius: 4, ...shadow },

  topbar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingVertical: 12 },
  navRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 8 },
  onboardBody: { flex: 1, alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingBottom: 24, paddingTop: 16 },
  scrollBody: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 32, gap: 20 },

  dots: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.line },
  dotOn: { width: 20, height: 6, borderRadius: 3, backgroundColor: colors.amber },
  dotOnWide: { width: 20, height: 6, borderRadius: 3, backgroundColor: colors.amber },

  eyebrow: { fontFamily: fonts.sansBold, fontSize: 10, letterSpacing: 1.2, textTransform: "uppercase", color: colors.amberDeep },
  eyebrowSoft: { fontFamily: fonts.sansBold, fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: colors.soft },
  h1: { fontFamily: fonts.serif, fontSize: 36, lineHeight: 38, color: colors.ink },
  h1Center: { fontFamily: fonts.serif, fontSize: 36, lineHeight: 38, color: colors.ink, textAlign: "center" },
  h1Center30: { fontFamily: fonts.serif, fontSize: 30, lineHeight: 33, color: colors.ink, textAlign: "center" },
  h1_31: { fontFamily: fonts.serif, fontSize: 31, lineHeight: 33, color: colors.ink },
  bodySoft: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 22, color: colors.soft },
  bodySoftCenter: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 19, color: colors.soft, textAlign: "center" },
  tinySoft: { fontFamily: fonts.sans, fontSize: 10, color: colors.soft },
  tinySoftCenter: { fontFamily: fonts.sans, fontSize: 10, color: colors.soft, textAlign: "center" },
  tinyInk: { fontFamily: fonts.sans, fontSize: 10, color: colors.ink },
  tinyBold: { fontFamily: fonts.sansBold, fontSize: 10, color: colors.ink },
  tinyPaperSoft: { fontFamily: fonts.sans, fontSize: 10, color: "rgba(255,253,248,0.6)" },
  semiboldSoft: { fontFamily: fonts.sansSemiBold, fontSize: 12, color: colors.soft },
  boldInk: { fontFamily: fonts.sansBold, color: colors.ink },
  linkBold: { fontFamily: fonts.sansBold, color: colors.amberDeep },
  linkSoft: { fontFamily: fonts.sans, fontSize: 12, color: colors.amberDeep },
  serif16: { fontFamily: fonts.serif, fontSize: 16, color: colors.ink },
  serif17: { fontFamily: fonts.serif, fontSize: 17, color: colors.ink },
  serif18Paper: { fontFamily: fonts.serif, fontSize: 18, color: colors.paper },
  serif22: { fontFamily: fonts.serif, fontSize: 22, color: colors.ink },
  serif23: { fontFamily: fonts.serif, fontSize: 23, color: colors.ink },
  serif24: { fontFamily: fonts.serif, fontSize: 24, color: colors.ink, textAlign: "center" },
  serif26: { fontFamily: fonts.serif, fontSize: 26, color: colors.ink },

  chips: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 20 },
  chip: { flexDirection: "row", alignItems: "center", gap: 10, height: 52, borderRadius: 14, borderWidth: 1, paddingHorizontal: 14 },
  chipOn: { backgroundColor: colors.sun, borderColor: colors.amber },
  chipOff: { backgroundColor: colors.paper, borderColor: colors.line },
  chipText: { fontFamily: fonts.sans, fontSize: 12, color: colors.ink },
  summary: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: colors.cream, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12 },

  ticket: { backgroundColor: colors.sun, borderRadius: 30, paddingHorizontal: 24, paddingTop: 30, paddingBottom: 22, alignItems: "center", justifyContent: "space-between", height: 286, marginTop: 24, overflow: "hidden", ...shadow },
  ticketCircle1: { position: "absolute", right: -44, top: -44, width: 156, height: 156, borderRadius: 78, backgroundColor: "rgba(255,178,26,0.28)" },
  ticketCircle2: { position: "absolute", left: -44, bottom: -44, width: 146, height: 146, borderRadius: 73, backgroundColor: "rgba(169,154,232,0.22)" },
  avatarCoral: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.coral, borderWidth: 3, borderColor: colors.paper },
  avatarTeal: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.teal, borderWidth: 3, borderColor: colors.paper },
  giftPill: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.paper, alignItems: "center", justifyContent: "center", marginHorizontal: -10, zIndex: 2 },
  ticketValue: { fontFamily: fonts.serif, fontSize: 44, color: colors.ink },
  codeRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", height: 48, borderRadius: 14, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.paper, paddingHorizontal: 16 },
  codeText: { fontFamily: fonts.sansBold, fontSize: 13, letterSpacing: 1, color: colors.ink },

  popBody: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 20, gap: 24 },
  readingCard: { flexDirection: "row", gap: 18, backgroundColor: colors.cream, borderRadius: 22, padding: 18, height: 210, overflow: "hidden" },
  readingGlow: { position: "absolute", right: -46, top: -48, width: 180, height: 180, borderRadius: 90, backgroundColor: "rgba(169,154,232,0.18)" },
  track: { height: 6, borderRadius: 3, backgroundColor: colors.line, width: "100%" },
  trackFill: { height: 6, borderRadius: 3, backgroundColor: colors.amber },
  roundAmber: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.amber, alignItems: "center", justifyContent: "center" },
  roundOutline: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: colors.line, alignItems: "center", justifyContent: "center" },
  insight: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: colors.ink, borderRadius: 14, paddingHorizontal: 16, height: 56 },

  emptyBody: { flex: 1, justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 28, paddingBottom: 20 },
  emptyGlow: { position: "absolute", left: 46, top: 26, width: 250, height: 250, borderRadius: 125, backgroundColor: "rgba(255,240,200,0.7)" },
  placeholderBook: { position: "absolute", left: 150, top: 92, width: 115, height: 153, borderWidth: 2, borderColor: colors.coral, borderStyle: "dashed", borderRadius: 6, backgroundColor: colors.paper, transform: [{ rotate: "30deg" }] },
  addMarker: { position: "absolute", left: 196, top: 138, width: 46, height: 46, borderRadius: 23, backgroundColor: colors.coral, alignItems: "center", justifyContent: "center" },

  catalogBody: { paddingHorizontal: 24, paddingTop: 14, paddingBottom: 24, gap: 20 },
  filter: { height: 36, borderRadius: 999, paddingHorizontal: 14, alignItems: "center", justifyContent: "center" },
  filterOn: { backgroundColor: colors.ink },
  filterOff: { backgroundColor: colors.cream },
  filterText: { fontFamily: fonts.sans, fontSize: 10, color: colors.soft },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 16 },
  gridItem: { width: "47.5%", gap: 12 },
  addPill: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  addPillText: { fontFamily: fonts.sansSemiBold, fontSize: 10, color: colors.ink },
  editorial: { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: colors.sun, borderRadius: 22, paddingHorizontal: 16, height: 88 },
  editorialIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.amber, alignItems: "center", justifyContent: "center" },

  profileCard: { flexDirection: "row", alignItems: "center", gap: 16, backgroundColor: colors.cream, borderRadius: 22, padding: 20 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.coral, alignItems: "center", justifyContent: "center" },
  avatarText: { fontFamily: fonts.serif, fontSize: 28, color: colors.ink },
  statBox: { flex: 1, backgroundColor: colors.cream, borderRadius: 14, padding: 16, gap: 4 },
  listRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 16, borderWidth: 1, borderColor: colors.line, borderRadius: 14, marginTop: 12 },
  listRowBorder: {},
  listLabel: { fontFamily: fonts.sans, fontSize: 14, color: colors.ink },
});
