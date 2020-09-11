import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  DeviceEventEmitter
} from "react-native";
import { RNSerialport, definitions, actions } from "react-native-serialport";
//type Props = {};
function App(){
 
      const [servisStarted, setServisStarted] = useState(false);
      const [connected, setConnected] = useState(false);
      const [usbAttached, setUsbAttached] = useState(false);
      const [output, setOutput] = useState("");
      const [outputArray, setOutputArray] = useState([]);
      const [baudRate, setBaudRate] = useState('38400');
      const [interface_, setInterface_] = useState('-1');
      const [sendText, setSendText] = useState('JUREG');
      const [returnedDataType, setReturnedDataType] = useState(definitions.RETURNED_DATA_TYPES.HEXSTRING);

    // this.startUsbListener = this.startUsbListener.bind(this);
    // this.stopUsbListener = this.stopUsbListener.bind(this);
  
    const timeToDisconnect = 50;

  useEffect(() => {
    startUsbListener()
    return () => {
      stopUsbListener()
    }
  }, [])


  function startUsbListener() {
    DeviceEventEmitter.addListener(
      actions.ON_SERVICE_STARTED,
      onServiceStarted,
      this
    );
    DeviceEventEmitter.addListener(
      actions.ON_SERVICE_STOPPED,
      onServiceStopped,
      this
    );
    DeviceEventEmitter.addListener(
      actions.ON_DEVICE_ATTACHED,
      onDeviceAttached,
      this
    );
    DeviceEventEmitter.addListener(
      actions.ON_DEVICE_DETACHED,
      onDeviceDetached,
      this
    );
    DeviceEventEmitter.addListener(actions.ON_ERROR, onError, this);
    DeviceEventEmitter.addListener(
      actions.ON_CONNECTED,
      onConnected,
      this
    );
    DeviceEventEmitter.addListener(
      actions.ON_DISCONNECTED,
      onDisconnected,
      this
    );
    DeviceEventEmitter.addListener(actions.ON_READ_DATA, onReadData, this);
    RNSerialport.setReturnedDataType(returnedDataType);
    RNSerialport.setAutoConnectBaudRate(parseInt(baudRate, 10));
    RNSerialport.setInterface(parseInt(interface_, 10));
    RNSerialport.setAutoConnect(true);
    RNSerialport.startUsbService();
  };

  const stopUsbListener = async () => {
    DeviceEventEmitter.removeAllListeners();
    const isOpen = await RNSerialport.isOpen();
    if (isOpen) {
      Alert.alert("isOpen", isOpen);
      RNSerialport.disconnect();
    }
    RNSerialport.stopUsbService();
  };

  function onServiceStarted(response) {
    setServisStarted(true);
    if (response.deviceAttached) {
      onDeviceAttached();
    }
  }

  function onServiceStopped() {
    setServisStarted(false);
  }

  function onDeviceAttached() {
    setUsbAttached(true);
  }

  function onDeviceDetached() {
    setUsbAttached(false );
  }

  function onConnected() {
    setConnected(true);
  }

  function onDisconnected() {
    setConnected(false);
  }

  function onReadData(data) {
    if (returnedDataType === definitions.RETURNED_DATA_TYPES.INTARRAY) {
      const payload = RNSerialport.intArrayToUtf16(data.payload);
      // console.log(payload);
      setOutput(output + payload);
      // console.log(output);
    } else if (returnedDataType === definitions.RETURNED_DATA_TYPES.HEXSTRING) {
      const payload = RNSerialport.hexToUtf16(data.payload);

      // console.log(data);

      if ((payload !== " ") && (payload !== "")){

        // console.log(payload)
        setOutput(output.concat(payload));
        // console.log(output);

      } else {
        // console.log(payload)
        // console.log(output);
        return
      }
    }
  }

  function onError(error) {
    console.error(error);
  }



 function handleConvertButton() {
    let data = "";
    if (returnedDataType === definitions.RETURNED_DATA_TYPES.HEXSTRING) {
      data = RNSerialport.hexToUtf16(output);
    } else if (returnedDataType === definitions.RETURNED_DATA_TYPES.INTARRAY) {
      data = RNSerialport.intArrayToUtf16(outputArray);
    } else {
      return;
    }
    // setOutput(data);
  }

  function handleClearButton() {
    // setOutput("");
    setOutputArray([]);
  }

  function handleSendButtonTurnOn(){
    RNSerialport.writeString("l");
  }

  function handleSendButtonTurnOff(){
    RNSerialport.writeString("d");
  }
  
  function handleOpenLocker1(){
    RNSerialport.isOpen().then(isOpen => {
      if(isOpen) {
        RNSerialport.writeHexString("A0000001200005D00");
          RNSerialport.disconnect();
      } else {
        console.log("Is oprn?", "no");

    }})
  }

  function handleOpenLocker2(){
    RNSerialport.isOpen().then(isOpen => {
      if(isOpen) {
    RNSerialport.writeHexString("A001000100005C00");
      RNSerialport.disconnect()
    } else {
      console.log("Is oprn?", "no");
    }})
  }

  function handleOpenLocker3(){
    RNSerialport.writeHexString("A002000100005B00");
    // setTimeout(() => {
      RNSerialport.disconnect()
    // }, timeToDisconnect);
  }
  
  function handleOpenLocker4(){
    RNSerialport.writeHexString("A003000100005A00");
    // setTimeout(() => {
      RNSerialport.disconnect()
    // }, timeToDisconnect);
  }

  function handleOpenLocker5(){
    RNSerialport.writeHexString("A004000100005900");
    // setTimeout(() => {
      RNSerialport.disconnect()
    // }, timeToDisconnect);
  }

  function handleOpenLocker6(){
    RNSerialport.writeHexString("A005000100005800");
    // setTimeout(() => {
      RNSerialport.disconnect()
    // }, timeToDisconnect);
  }

  function handleOpenLocker7(){
    RNSerialport.writeHexString("A006000100005700");
    // setTimeout(() => {
      RNSerialport.disconnect()
    // }, timeToDisconnect);
  }

  function handleOpenLocker8(){
    RNSerialport.writeHexString("A007000100005600");
    // setTimeout(() => {
      RNSerialport.disconnect()
    // }, timeToDisconnect);
  }

  function handleOpenLocker7(){
    RNSerialport.writeHexString("A008000100005500");
    // setTimeout(() => {
      RNSerialport.disconnect()
    // }, timeToDisconnect);
  }

  const buttonStyle = status => {
    return status
      ? styles.button
      : Object.assign({}, styles.button, { backgroundColor: "#C0C0C0" });
  };

  function listDevice(){
    RNSerialport.getDeviceList().then(response => 
      console.log(response)//list
    );
  }

  function connectToDevice(){
    RNSerialport.connectDevice("/dev/bus/usb/001/002", 38400);
  }

  function connectionStatus(){
    RNSerialport.isOpen().then(isOpen => {
      if(isOpen) {
        console.log("Is open?", "yes");
      } else {
        console.log("Is oprn?", "no");
      }
    }).catch(err => {
      console.log(err);
    });
  }

  
  
    return (
      <ScrollView style={styles.body}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.line}>
              <Text style={styles.title}>Service:</Text>
              <Text style={styles.value}>
                {servisStarted ? "Started" : "Not Started"}
              </Text>
            </View>
            <View style={styles.line}>
              <Text style={styles.title}>Usb:</Text>
              <Text style={styles.value}>
                {usbAttached ? "Attached" : "Not Attached"}
              </Text>
            </View>
            <View style={styles.line}>
              <Text style={styles.title}>Connection:</Text>
              <Text style={styles.value}>
                {connected ? "Connected" : "Not Connected"}
              </Text>
            </View>
          </View>
          {/* <ScrollView style={styles.output} nestedScrollEnabled={true}>
            <Text style={styles.full}>
              {output === "" ? "No Content" : output}
            </Text>
          </ScrollView> */}

          {/* <View style={styles.inputContainer}>
            <Text>Send</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => setSendText( text )}
              value={sendText}
              placeholder={"Send Text"}
            />
          </View> */}
          <View style={styles.line2}>
            <TouchableOpacity
              style={buttonStyle(connected)}
              onPress={() => handleSendButtonTurnOn()}
              disabled={!connected}
            >
              <Text style={styles.buttonText}>Liga</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={buttonStyle(connected)}
              onPress={() => handleSendButtonTurnOff()}
              disabled={!connected}
            >
              <Text style={styles.buttonText}>Desliga</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.button}
              onPress={() => handleClearButton()}
            >
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleConvertButton()}
            >
              <Text style={styles.buttonText}>Convert</Text>
            </TouchableOpacity> */}
              </View>
              <View style={styles.line2}>

              <TouchableOpacity
              style={buttonStyle(connected)}
              onPress={() => handleOpenLocker1()}
              disabled={!connected}
              >
              <Text style={styles.buttonText}>Locker 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={buttonStyle(connected)}
              onPress={() => handleOpenLocker2()}
              disabled={!connected}
              >
              <Text style={styles.buttonText}>Locker 2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={buttonStyle(connected)}
              onPress={() => handleOpenLocker3()}
              disabled={!connected}
              >
              <Text style={styles.buttonText}>Locker 3</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.line2}>
            <TouchableOpacity
              style={buttonStyle(connected)}
              onPress={() => handleOpenLocker4()}
              disabled={!connected}
              >
              <Text style={styles.buttonText}>Locker 4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={buttonStyle(connected)}
              onPress={() => handleOpenLocker5()}
              disabled={!connected}
              >
              <Text style={styles.buttonText}>Locker 5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={buttonStyle(connected)}
              onPress={() => handleOpenLocker6()}
              disabled={!connected}
              >
              <Text style={styles.buttonText}>Locker 6</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.line2}>
              
            <TouchableOpacity
              style={buttonStyle(connected)}
              onPress={() => handleOpenLocker7()}
              disabled={!connected}
              >
              <Text style={styles.buttonText}>Locker 7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={buttonStyle(connected)}
              onPress={() => handleOpenLocker8()}
              disabled={!connected}
              >
              <Text style={styles.buttonText}>Locker 8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={buttonStyle(connected)}
              onPress={() => handleOpenLocker9()}
              disabled={!connected}
              >
              <Text style={styles.buttonText}>Locker 9</Text>
            </TouchableOpacity>
            </View>
            
          <View>
            <TouchableOpacity
              style={buttonStyle(connected)}
              onPress={() => listDevice()}
              disabled={!connected}
            >
              <Text style={styles.buttonText}>List Device</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={buttonStyle(!connected)}
              onPress={() => connectToDevice()}
              disabled={connected}
            >
              <Text style={styles.buttonText}>Connect</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => connectionStatus()}
              // disabled={!connected}
            >
              <Text style={styles.buttonText}>Connection Status</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  
}

const styles = StyleSheet.create({
  full: {
    flex: 1
  },
  body: {
    flex: 1
  },
  container: {
    flex: 1,
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16
  },
  header: {
    display: "flex",
    justifyContent: "center"
    //alignItems: "center"
  },
  line: {
    display: "flex",
    flexDirection: "row"
  },
  line2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    width: 100
  },
  value: {
    marginLeft: 20
  },
  output: {
    marginTop: 10,
    height: 100,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1
  },
  inputContainer: {
    marginTop: 10,
    borderBottomWidth: 2
  },
  textInput: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 40
  },
  button: {
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 2,
    marginRight: 2,
    paddingLeft: 15,
    paddingRight: 15,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#147efb",
    borderRadius: 3,
    borderColor: "black"
  },
  buttonText: {
    color: "#FFFFFF"
  }
});

export default App;