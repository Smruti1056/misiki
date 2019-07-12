import React , { Component } from 'react' ;
import {Dimensions, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import faker from 'faker';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import Taxi from './Taxi';
import FoodItems from './FoodItems';
import axios from 'axios'

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class FoodList extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <RecyclerListView
                    style={{flex: 1}}
                    rowRenderer={this.rowRenderer}
                    dataProvider={this.state.list}
                    layoutProvider={this.layoutProvider}
                />
             </View>
            );
        }



    // apiAdd = () =>{
    //     axios.get("https://api.misiki.in/api/dishes")
    //     //.then(function(response){
    //         //console.log(response.data);
    //     })
    // }

    componentDidMount() {
        axios.get('https://api.misiki.in/api/dishes').then(res => {
            console.log(res);
            this.props.setState({ realItems: res.data });
        });
    }


    rowRenderer = (  data) => {
        //const { _id,q,updatedAt,createdAt,name,img,rate}= data;
        return(
            <View>
            
            <TouchableOpacity style = {styles.listItem} onPress={() => this.props.navigation.navigate(`FoodItems`,{realItems: data._id})}>
                <Image style={styles.image1} source={{uri: data.img}}/>
                <View style={styles.body}>
                <Text style={styles.name}>{data.name}</Text>
                <Text style={styles.price}>{data.rate}</Text>
                <Text style={styles.desciption}>{data.q}</Text>
            <Text style={styles.desciption}>{data.type1}</Text>
                 </View>
                </TouchableOpacity>
            
            
                {/* <TouchableOpacity style = {styles.listItem} onPress={() => this.props.navigation.navigate(`FoodItems`,{itemId: itemid})}>
                <Image style={styles.image1} source={{uri: image}}/>
                <View style={styles.body}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>{price}</Text>
                <Text style={styles.desciption}>{description}</Text>
                </View>
                </TouchableOpacity> */}
            </View>
        )
        }
        
    constructor(props){
        super(props);
        //const fakedata = []
        const realItems= [];  
              
           
     
        this.props.state= {
           
            realItems: [],
            list: new DataProvider((r1,r2) => r1 != r2).cloneWithRows(realItems),
            
        };

        this.layoutProvider = new LayoutProvider((i) => {
            return this.state.list.getDataForIndex(i).type;
        }, (type, dim) => {
            switch(type) {
                case 'NORMAL':
                dim.width = SCREEN_WIDTH ;
                dim.height= 100;
                break;
                default: 
                dim.width = 0;
                dim.height= 0;
                break;
            }
        });

        }

    }
  
    const AppStackNavigator = createStackNavigator({
        FoodList: {screen: FoodList},
        FoodItems : { screen: FoodItems },
        Taxi: { screen: Taxi},
        
      });
    
      

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        minHeight: 1,
        minWidth: 1,

    },
    body: {
        //justifyContent: "space-around",
        //alignItems: "center",
        marginLeft: 10,
        marginRight: 10,
        maxWidth: SCREEN_WIDTH - (80 + 10 +20),
    },
    image1:{
        height: 80,
        width: 80,
    },
    name:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    description:{
        fontSize: 16,
        opacity: 0.5,
    },
    price: {
        fontSize: 18,
        flexDirection: 'row', 

    },
    listItem: {
        borderWidth: 2,
        //borderColor: 'red',
        flexDirection: 'row',
        margin: 10,
       padding: 5,
        position: 'relative',
       
    }
});

