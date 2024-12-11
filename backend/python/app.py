import time
from flask import Flask, request, jsonify
from flask_cors import CORS
import ctypes

app = Flask(__name__)
CORS(app)

# Load the C++ library
cpp_library = ctypes.CDLL(r'C:\Users\taras\OneDrive\Робочий стіл\Online_exchange\backend\c++\x64\Release\funcdll.dll')


class CurrencyConverter:
    def __init__(self):
        class FloatArray2(ctypes.Structure):
            _fields_ = [("values", ctypes.c_float * 2)]

        # Declare function prototypes from the C++ library
        self.calculate_currency_rate = cpp_library.convertCurrency
        self.calculate_currency_rate.argtypes = [ctypes.c_char_p, ctypes.c_float]
        self.calculate_currency_rate.restype = FloatArray2

    def convert(self, currency, value):
        # Calling the C++ function
        exchange_rate = self.calculate_currency_rate(currency.strip("\"").encode('utf-8'), value)

        rounded_uah_rate = exchange_rate.values[0]
        rounded_usd_rate = exchange_rate.values[1]

        return {
            "uah_rate": round(rounded_uah_rate, 2),
            "usd_rate": round(rounded_usd_rate, 2)
        }

    def delayed_message(self):
        time.sleep(3)
        return {'message': 'Успішно'}


currency_converter = CurrencyConverter()


@app.route('/convert', methods=['GET'])
def convert():
    currency = request.args.get('currency')
    value = float(request.args.get('value', 1.0))

    # print(currency)
    # print(value)

    response = currency_converter.convert(currency, value)

    return jsonify(response)


@app.route('/payed', methods=['GET'])
def delayed_message():
    response = currency_converter.delayed_message()

    return jsonify(response)


if __name__ == '__main__':
    app.run()
