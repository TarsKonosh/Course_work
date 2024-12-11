#pragma once
#include <string>
#include <array>
#include <unordered_map>

extern "C" __declspec(dllexport) std::array<float, 2> convertCurrency(const char* currency, float value);
