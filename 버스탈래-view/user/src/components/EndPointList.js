// 정거장 등록 (RideBus) -> 버스 등록 페이지 ( 몇번 버스 탈건지 )

import axios from 'axios';
import React, { useState, useEffect }from 'react';
import { View, Button, StyleSheet, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';


const EndPointList = ({navigation, route}) => {
    const { 
        busNums,
        busFirstTime,
        busSecondTime,
        busFirstNum,
        busSecondNum,
        busDirs,
        currentBusStop,
        busRouteId,
        userId, 
        selectedUID,
        selectedName,
        arrive // 검색한 도착지 정류장
    } = route.params;
    const [ebusArsId, setEBusArsId] = useState('');
   

    useEffect(() => {
        axios.get(`http://port-0-java-springboot-12fhqa2blnemug25.sel5.cloudtype.app/getStationByName?stSrch=${arrive}`)
        .then(response => {
          console.log("==== EndPointList 페이지 ====");
          // 가져온 데이터를 상태에 저장 response.data == bus Class
          console.log('200 요청 성공');
          console.log('busNums : ' + busNums);
          console.log(response.data);
          console.log('arrive : ' + arrive);

          setEBusArsId(response.data.arsId);            // 도착 버스 번호
          
          console.log('endArsId: ' + response.data.arsId);
          console.log('arrive: ' + arrive);
          navigation.navigate('EndPointData', {
            // 출발지의 그것들
            busNums,
            busFirstTime,
            busSecondTime,
            busFirstNum,
            busSecondNum,
            busDirs,
            currentBusStop,
            busRouteId,
            userId, 
            selectedUID,
            selectedName,
            ebusArsId : response.data.arsId,
            userId: userId,
            selectedName: selectedName,
            arrive
        });
        })
        .catch(error => {
          console.log('endPointList 페이지 error : 요청 실패');
          console.error('Error fetching bus stops:', error);
        });
}, []);




    return (
      <>
      <Text>로딩중 ~ !</Text>
      </>
        
    );
};


export default EndPointList;
