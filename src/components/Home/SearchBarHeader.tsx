import { RoundedIcon } from '@/src/components/util/RoundedIcon';
import { AppContext, Store } from '@/src/hooks/AppContext';
import React, { useContext } from 'react';
import { FlatList, View } from 'react-native';
import { Divider, List, Searchbar, Switch } from 'react-native-paper';
import { CustomModal } from '../util/CustomModal';

interface SearchBarHeaderProps {
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
  showMenu: boolean;
  setShowMenu: (val: boolean) => void;
}

export const SearchBarHeader = ({ value, onChange, onSubmit, showMenu, setShowMenu }: SearchBarHeaderProps) => {
  const { stores, setStores } = useContext(AppContext);
  const toggleStore = ( enable:boolean, store: Store ) => {
    const temp = [...stores];
    const i = temp.findIndex(st => st.code === store.code);
    temp[i].enabled = enable;
    setStores(temp);
  }
  return (  
    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
      <Searchbar 
        style={{ flex: 1 }} 
        placeholder='Buscar productos' 
        value={value} 
        onChangeText={onChange} 
        onSubmitEditing={onSubmit} 
      />
      <RoundedIcon source='tune-variant' onPress={() => setShowMenu(true)} />
      <CustomModal isOpen={ showMenu } onClose={ () => setShowMenu(false) } title='Buscar en:'>
        <FlatList 
          data={ stores }
          key='store-list-modal'
          keyExtractor={(item, ix) => `${item}-${ix}`}
          ItemSeparatorComponent={()=> <Divider />}
          renderItem={ ({ item }) => <List.Item 
            title={ item.name } 
            left={ props => <List.Icon {...props} icon='cart'/> }
            right={ () => <Switch value={item.enabled} onValueChange={value => toggleStore(value, item) } />}/>
          }/>
      </CustomModal>
    </View>
)};