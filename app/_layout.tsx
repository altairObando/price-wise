import { RoundedIcon } from '@/src/components/util/RoundedIcon';
import { AppContextProvider } from '@/src/hooks/AppContext';
import { Tabs } from 'expo-router';
import { StatusBar, useColorScheme, View } from 'react-native';
import { MD3DarkTheme as DarkTheme, MD3LightTheme as DefaultTheme, Icon, PaperProvider, useTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const unstable_settings = {
  anchor: '(home)',
};
function RootLayout() {
  const theme = useTheme();
  return <Tabs screenOptions={{
    headerTitle: 'Price Wise',
    headerRight: (props) => <View style={{ display:'flex', flexDirection:'row', gap: 8 }}>
      <RoundedIcon {...props} size={24} source='bell' />
      <RoundedIcon {...props} size={24} source='account' />
    </View>,
    headerStyle:{
      backgroundColor: theme.colors.background
    },
    headerTintColor: theme.colors.onBackground,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    tabBarStyle: {
      backgroundColor: theme.colors.background,
      borderTopWidth: 0,
    },
    tabBarActiveTintColor: theme.colors.primary,
    tabBarInactiveTintColor: theme.colors.secondary,
  }}>
    <Tabs.Screen name='(home)' options={{ headerShown: false, title:'Home', tabBarIcon: (props) => <Icon {...props} source='home' />}} />
    <Tabs.Screen name='fav' options={{ title:'Favoritos', tabBarIcon: (props) => <Icon {...props} source='heart' />}} />
    <Tabs.Screen name='alerts' options={{ title:'Alertas', tabBarIcon: props => <Icon {...props} source='bell' /> }} />
    <Tabs.Screen name='profile' options={{ title:'Perfil', tabBarIcon: (props) => <Icon {...props} source='account' />}} />
  </Tabs>
}

export default function App(){
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const theme = isDark ? DarkTheme : DefaultTheme;
  return (
    <SafeAreaProvider>
      <AppContextProvider>
        <PaperProvider theme={{...theme, colors:{...theme.colors, primary: '#663399'}}}>
          <StatusBar />
          <RootLayout />      
        </PaperProvider>
      </AppContextProvider>
    </SafeAreaProvider>
  );
}