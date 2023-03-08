#include <Adafruit_SCD30.h>

Adafruit_SCD30  scd30;

void setup(void) {
    Serial.begin(115200);
    
    // Try to initialize!
    if (!scd30.begin()) {
        Serial.println("Failed to find SCD30 chip");
        while (1) { delay(10); }
    }

    if (!scd30.setMeasurementInterval(2)) {
        Serial.println("Failed to set measurement interval");
        while(1){ delay(10); }
    }
}

void loop() {
    if (scd30.dataReady()) {
        if (!scd30.read()) {
            return; 
        }
        Serial.print(scd30.temperature);
        Serial.println(",");
        Serial.print(scd30.relative_humidity);
        Serial.println(",");
        Serial.print(scd30.CO2, 3);
        Serial.println("");
    } else {
        //Serial.println("No data");
    }

    delay(100);
}
