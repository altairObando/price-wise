
import { useState } from "react";
import { Searchbar, Surface, Text } from "react-native-paper";

export default function Index() {
  const [ searchText, setSearchText ] = useState('');
  return <Surface
      style={{flex: 1, padding: 8 }}>
        <Searchbar placeholder='Search a product' value={ searchText } onChangeText={ setSearchText }/>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </Surface>
}
