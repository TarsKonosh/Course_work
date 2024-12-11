#include <iostream>
#include <string>
#include <array>
#include <unordered_map>

class CurrencyConverter {
private:
    std::unordered_map<std::string, std::array<float, 2>> coinRates;

public:
    CurrencyConverter() {
        coinRates["BTC"] = { 1000322.08, 26852.84 };
        coinRates["BCH"] = { 4219.91, 111.78 };
        coinRates["DOGE"] = { 2.66, 0.07 };
        coinRates["LTC"] = { 3485.56, 92.0 };
        coinRates["XRP"] = { 19.27, 0.51 };
        coinRates["DASH"] = { 1567.70, 41.47 };
        coinRates["TRX"] = { 2.82, 0.07 };
    }

    std::array<float, 2> convertCurrency(const std::string& currency, float value) {
        auto it = coinRates.find(currency);
        if (it != coinRates.end()) {
            std::array<float, 2> exchange_rate = it->second;
            exchange_rate[0] *= value; // Multiply UAH rate by value
            exchange_rate[1] *= value; // Multiply USD rate by value
            return exchange_rate;
        }
        else {
            return { 0.0, 0.0 }; // Default UAH rate and USD rate
        }
    }
};

extern "C" {
    CurrencyConverter cc;

    __declspec(dllexport) std::array<float, 2> __cdecl convertCurrency(const char* currency, float value) {
        return cc.convertCurrency(std::string(currency), value);
    }
}
