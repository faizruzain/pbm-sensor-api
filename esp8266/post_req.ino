#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
 
const char *WIFI_SSID = "wifimantab";
const char *WIFI_PASSWORD = "qweqwe123";
const char *URL = "http://afr-pbm-sensor-api.herokuapp.com/api/sensor/1/data";
//const char *URL = "http://ptsv2.com/t/oqo1y-1638372039/post";
 
WiFiClient client;
HTTPClient httpClient;
 
void setup()
{
    //Serial.begin(9600);
    pinMode(LED_BUILTIN, OUTPUT);
 
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        //Serial.print(".");
    }
 
    //Serial.println("Connected");
    
}
 
void loop()
{
    int randNumber1 = random(1, 50); //random number
    int randNumber2 = random(5, 80); //random number
    int randNumber3 = random(6, 90); //random number
    
    //String data = "{\"sensor1\":{\"date\": \"date\",\"value\":\""+String(randNumber1)+"\"},\"sensor2\": {\"date\": \"date\",\"value\":\""+String(randNumber2)+"\"},\"sensor3\": {\"date\": \"date\",\"value\":\""+String(randNumber3)+"\"}}";
    //String data = "{\"sensor1\":{\"date\": \"date\",\"value\": 98.321},\"sensor2\": {\"date\": \"date\",\"value\": 6656.2356},\"sensor3\": {\"date\": \"date\",\"value\":8856}}";
    String data = "value1="+String(randNumber1)+"&value2="+String(randNumber2)+"&value3="+String(randNumber3);
 
    httpClient.begin(client, URL);
    httpClient.addHeader("Content-Type", "application/x-www-form-urlencoded"); //httpClient.addHeader("Content-Type", "application/json");
    httpClient.POST(data);
    String content = httpClient.getString();
    httpClient.end();
 
    //Serial.println(content);
    delay(7000);
}
