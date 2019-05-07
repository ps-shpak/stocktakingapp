import 'dart:convert';

import 'package:barcode_scan/barcode_scan.dart';
import 'package:stocktakingmobile/domain/model/item_request_result.dart';
import 'package:stocktakingmobile/domain/model/qr_code_Item.dart';
import 'package:stocktakingmobile/domain/model/item.dart';
import 'package:stocktakingmobile/domain/model/qr_code_scan_result.dart';
import 'package:stocktakingmobile/domain/service/scanning_page_service.dart';
import 'package:flutter/services.dart';

class ScanningPageServiceImpl implements ScanningPageService {
  @override
  Future<QRCodeScanResult> scanCode() async {
    String code = '';

    try {
      code = await BarcodeScanner.scan();
    } on PlatformException catch (ex) {
      if (ex.code == BarcodeScanner.CameraAccessDenied) {
        return QRCodeScanResult(QRCodeItem(), QRCodeScanError.CAMERA_PERMISSIONS);
      } else {
        return QRCodeScanResult(QRCodeItem(), QRCodeScanError.UNKNOWN);
      }
    } on FormatException {
      return QRCodeScanResult(QRCodeItem(), QRCodeScanError.BACK_PRESSED);
    } catch (ex) {
      return QRCodeScanResult(QRCodeItem(), QRCodeScanError.UNKNOWN);
    }

    await Future.delayed(Duration(seconds: 3));

    var item = _parseQRCode(code);

    if (item == null) {
      return QRCodeScanResult(QRCodeItem(), QRCodeScanError.PARSING);
    }

    return QRCodeScanResult(_parseQRCode(code), null);
  }

  @override
  Future<ItemRequestResult> requestItem(String url) async {
    try {
      return null;
    } catch (ex) {
      return ItemRequestResult(Item(), ItemRequestError.UNKNOWN);
    }
  }

  QRCodeItem _parseQRCode(String code) {
    try {
//      Map<String, dynamic> itemJson = jsonDecode(code);
      var result = QRCodeItem();
//      result.url = itemJson['url'];
//      result.name = itemJson['name'];
//      result.owner = itemJson['owner'];
//      result.ownerId = itemJson['owner_id'];
      return result;
    } catch (ex) {
      return null;
    }
  }

  Item _parseResponse(String body) {
    try {
      Map<String, dynamic> itemJson = jsonDecode(body);
      return null;
    } catch (ex) {
      return null;
    }
  }
}
