import { RoundedIcon } from '@/src/components/util/RoundedIcon';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function HomeLayout(){
    const theme = useTheme();
    return <Stack screenOptions={{
        headerRight: (props) => <View style={{ display:'flex', flexDirection:'row', gap: 8 }}>
          <RoundedIcon {...props} size={24} source='bell' />
          <RoundedIcon {...props} size={24} source='account' />
        </View>,
        headerStyle:{
          backgroundColor: theme.colors.background
        },
        headerTintColor: theme.colors.onBackground,
    }}>
        <Stack.Screen name='index' options={{ headerTitle: 'Price Wise'}}/>
        <Stack.Screen name='search' options={{ headerTitle: 'Buscar' }} />
    </Stack>
}