//fetching the api with the fetch ---the change is "the fech is being replaced with the axios api"

import React , { Component } from 'react' ;
import {Dimensions,ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class FoodItems extends Component {
 
   
    increment=() => {
      
      this.setState({
         no_of_items :this.state.no_of_items + 1,
      }
      
      );
    };
    decrement=() => {
      
      this.setState({
         no_of_items :this.state.no_of_items - 1,
                 }
      );
    };

    render() {
      const id= this.state._id;
      const img= "https://www.misiki.in/images"+this.state.img;
      const name = this.state.name;
      const rate = this.state.rate * this.state.no_of_items;
      const restaurant = this.state.restaurant;
      const stock = this.state.stock;
      const time = this.state.time;
      const type = this.state.type;

      // IF condition
    const food_Veg = <Image 
    style={{height:40,width:40,marginRight:0}}
    source={{uri :  'https://www.misiki.in/veg.png'}}/>;

    const food_Nonveg = <Image style={{height:40,width:40,marginRight:0}}
    source={{uri : 'https://www.misiki.in/non-veg.png'}}/>;


    let food;
    if (this.state.type == 'V'){
      food = food_Veg
    } else {
      food = food_Nonveg
    }
      
      
        return (
          
          <ScrollView style={styles.container}>
             <View style={styles.top}>
               
               <Image style={styles.image1} source={{uri: img}} resizeMode='contain'/>
               
               
               <View style={styles.top1}>
               <Text style={styles.slugStyle}>
                      {restaurant}     
                </Text>
                <Text style={styles.stockStyle}>
                            Only {stock} left
                          </Text>
                </View>
                <View style={styles.center}>
                 
                 <Text style={styles.chocoStyle}>
                            {name}    
                  </Text>
                 
                         
                  <View style={styles.buttom}>  
                      <View style={styles.imagelogo}>
                         {food}  
                     </View>

                    
                      
                  </View>
                  <View style={styles.amountStyle}>
                  <Text style={styles.rateStyle}>
                       INR: {rate}
                     </Text>
                     
                     
                     
                     {/* <View style={styles.amount1Style}> */}
                            <TouchableOpacity style={styles.inc_style} onPress={this.increment} >
                                <Icon name={'add'}  size={20}  /> 
                            </TouchableOpacity>
                
                            <Text>no of items={this.state.no_of_items}</Text>

                          {this.state.no_of_items > 0 ? <TouchableOpacity style={styles.dec_style} onPress={this.decrement}>
                          <Icon name={'remove'}  size={20}  />
                          </TouchableOpacity> : null }
                    {/* </View> */}
               </View>
                 <Text style={styles.timeStyle}>
                 Expected Delivery:{time}
                  </Text>
                                       
                                              
                 </View>          
               
               
               
               {/* <Text>{type}</Text> */}
                             
                
                
                
           
      
               </View>                        
               </ScrollView>
        );
            }

            constructor(props)
            {
              super(props);
             
              this.arrayholder = [];
              this.state = {
                no_of_items: 1,
                first_name: '',
                last_name: '',
                qr_no: '',
                isLoading: true,
                search: '',
                
              };
         
                                 
              
            }
          
          

          componentDidMount() {
            const itemId = this.props.navigation.getParam('itemId', 'NO-ID');
                              
                   
                          axios.get(`https://www.misiki.in/api/foods/${itemId}`)
                .then((response) => {
                 
                  this.setState({
                    isLoading: false,
                  _id: response.data["_id"],
                  img: response.data["img"],
                  name: response.data["name"],
                  rate: response.data["rate"],
                  restaurant: response.data["restaurant"],
                  stock: response.data["stock"],
                  time: response.data["time"],
                  type: response.data["type"],
                         })
                        
                      })
                   
                   .catch((error) => {
                     console.error(error);
                   });

                 
               }

               

    }
  
    const AppStackNavigator = createStackNavigator({
        
        FoodItems: { screen: FoodItems}
      },
     );
    
      

const styles = StyleSheet.create({
    TextStyle: {
      fontSize: 25,
      textAlign: 'center'
    },
    container:{
      flex:1,
    },
    top:{
      height:'35%',
      // width:'100%',
    },
    amountStyle:{
      margin: '10%',
      alignItems:'flex-end',
      flexDirection: 'row',
      flexWrap: 'wrap',
      
      
    },
   
    slugStyle:{
    
      fontSize:18,
      padding:20,
      textAlign:"left",
      color:'red',
      
    
  },
  rateStyle:{
    fontSize:20,
    textAlign:'center',
  },
  center:{
    height:'100%',
    width:'100%',
    // backgroundColor: 'grey',
    // justifyContent:'center'
    // backgroundColor:'blue',
  },
  top1:{
    height:'10%',
    // width:'100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // backgroundColor: 'grey',
  },
  stockStyle:{
    fontSize:15,
    padding:20,
    textAlign:"right",
     alignItems:"flex-end",
  },
    image1:{
      height: 300,
      width: '100%',
      flex:1,
        },
        timeStyle:{
          fontSize:15,
          padding:10,
          textAlign:'center',
       
        },
        imagelogo:{
  
          width: SCREEN_WIDTH * 0.2,
          height: SCREEN_HEIGHT * 0.3,
        
        },
        
        buttom:{
          height:'10%',
          alignItems:'flex-end',
          // backgroundColor: 'grey',
         
          // backgroundColor: 'red' , 
        },
        chocoStyle: {
          fontSize:25,
          padding:20,
          color:'black',
          fontWeight: 'bold',
        },
    inc_style: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'flex-end',
        
        
        justifyContent:'flex-end',
        width:30,
        height:30,
        backgroundColor:'#fff',
        borderRadius:50,
        },
      dec_style: {
          borderWidth:1,
          borderColor:'rgba(0,0,0,0.2)',
          alignItems:'flex-end',
        
          justifyContent:'flex-end',
          width:30,
          height:30,
          backgroundColor:'#fff',
          borderRadius:50,
          },

});

