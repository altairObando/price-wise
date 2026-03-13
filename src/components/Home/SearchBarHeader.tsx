import { RoundedIcon } from '@/src/components/util/RoundedIcon';
import React from 'react';
import { View } from 'react-native';
import { Menu, Searchbar } from 'react-native-paper';

interface SearchBarHeaderProps {
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
  stores: string[];
  showMenu: boolean;
  setShowMenu: (val: boolean) => void;
}

export const SearchBarHeader = ({ value, onChange, onSubmit, stores, showMenu, setShowMenu }: SearchBarHeaderProps) => (
  <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
    <Searchbar 
      style={{ flex: 1 }} 
      placeholder='Buscar productos' 
      value={value} 
      onChangeText={onChange} 
      onSubmitEditing={onSubmit} 
    />
    <Menu 
      visible={showMenu}
      onDismiss={() => setShowMenu(false)}
      anchor={<RoundedIcon source='tune-variant' onPress={() => setShowMenu(true)} />}>
      {stores.map((name, index) => (
        <Menu.Item title={name} key={`${index}-${name}`} leadingIcon='cart' />
      ))}
    </Menu>
  </View>
);