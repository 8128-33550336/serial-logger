#include <Adafruit_SCD30.h>

Adafruit_SCD30  scd30;
String incomingByte;

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
        Serial.print(",");
        Serial.print(scd30.relative_humidity);
        Serial.print(",");
        Serial.print(scd30.CO2, 3);
        Serial.print("\n");
    } else {
        //Serial.println("No data");
    }
    if (Serial.available() > 0) {
        incomingByte = Serial.readStringUntil('¥n');
        int num = incomingByte.toInt();
        if (num == 0) {
            return;
        }
        scd30.forceRecalibrationWithReference(num);
    }

    delay(100);
}
