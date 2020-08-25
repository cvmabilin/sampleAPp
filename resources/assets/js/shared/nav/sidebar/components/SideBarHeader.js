import React from 'react';
import { View, Image, StatusBar, TouchableOpacity, Platform } from 'react-native';
import logo from '../../../images/kadoubot.png'

let sideBarPaddingTop = (Platform.OS === 'ios') ? 50 : StatusBar.currentHeight + 10

const SideBarHeader = ({ navigateToCallback }) => (
	<TouchableOpacity onPress={() => navigateToCallback('mainPage')}>
		<View
			style={{
				flexDirection: 'row',
				backgroundColor: '#28a745',
				paddingVertical: 28,
				paddingLeft: 17,
				paddingTop: sideBarPaddingTop,
				alignItems: 'center',
			}}
		>
			<Image
				source={logo}
				style={{
					resizeMode: 'stretch',
					flex: 1,
					height: 50
				}}
			/>
			{/* 
			Add title
			<Text style={{ color: '#FFF', paddingLeft: 9, fontSize: 16 }}>
				ReactiveSearch
			</Text> */}
		</View>
	</TouchableOpacity>
);

export default SideBarHeader;