import { Slot, Stack, Tabs } from "expo-router";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";

const AppLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="auth/index" options={{ headerShown: false }} />
            <Stack.Screen name="auth/login/index" options={{ title: "" }} />
            <Stack.Screen name="auth/sign-up/index" options={{ title: "" }} />
            <Stack.Screen
                name="auth/reset/index"
                options={{ title: "Reset Password" }}
            />
            <Stack.Screen name="home/index" options={{ headerShown: false }} />
            <Stack.Screen name="user/index" options={{ headerShown: false }} />
            <Stack.Screen name="setting/index" options={{ title: "" }} />
            <Stack.Screen
                name="user/changePassword/index"
                options={{ title: "" }}
            />
            <Stack.Screen name="user/edit/index" options={{ title: "" }} />
            <Stack.Screen
                name="listResult/index"
                options={{ title: "Result" }}
            />
            <Stack.Screen
                name="listResult/infoResult/[id]"
                options={{ title: "" }}
            />
            <Stack.Screen name="hotel/index" options={{ title: "" }} />
            <Stack.Screen name="user/help/index" options={{ title: "" }} />
            <Stack.Screen
                name="user/ticketHistory/index"
                options={{ title: "" }}
            />
            <Stack.Screen
                name="user/roomHistory/index"
                options={{ title: "" }}
            />
            <Stack.Screen name="detail/ticket/[id]" options={{ title: "" }} />
            <Stack.Screen name="detail/room/[id]" options={{ title: "" }} />
            <Stack.Screen
                name="notification/index"
                options={{ title: "Notification" }}
            />
            <Stack.Screen
                name="bookvehicle/index"
                options={{ title: "Book Vehicle" }}
            />
            <Stack.Screen
                name="schedule/[id]"
                options={{ title: "Schedule" }}
            />
            <Stack.Screen name="schedule/list/index" options={{ title: "" }} />
            <Stack.Screen name="ai/index" options={{ title: "Pershot" }} />
            <Stack.Screen name="share/index" options={{ title: "Share" }} />
            <Stack.Screen name="hotel/infoRoom/[id]" options={{ title: "" }} />
            <Stack.Screen name="hotel/compare/index" options={{ title: "" }} />
            <Stack.Screen
                name="hotel/compare/comparePage/index"
                options={{ title: "COMPARE" }}
            />
            <Stack.Screen
                name="hotel/reviewHotel/[id]"
                options={{ title: "" }}
            />

            <Stack.Screen
                name="listResult/reviewLocation/[id]"
                options={{ title: "" }}
            />
            <Stack.Screen
                name="bookvehicle/select/[id]"
                options={{ title: "Tickets" }}
            />
            <Stack.Screen
                name="hotel/select/index"
                options={{ title: "Tickets" }}
            />
            <Stack.Screen name="user/comment/index" options={{ title: "" }} />
        </Stack>
    );
};

export default AppLayout;
