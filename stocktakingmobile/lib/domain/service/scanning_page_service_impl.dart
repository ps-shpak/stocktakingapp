import 'package:barcode_scan/barcode_scan.dart';
import 'package:stocktakingmobile/domain/model/item.dart';
import 'package:stocktakingmobile/domain/model/item_request_result.dart';
import 'package:stocktakingmobile/domain/service/scanning_page_service.dart';
import 'package:flutter/services.dart';

class ScanningPageServiceImpl implements ScanningPageService {
  @override
  Future<ItemScanResult> scanCode() async {
    String code = '';

    try {
      code = await BarcodeScanner.scan();
    } on PlatformException catch (ex) {
      if (ex.code == BarcodeScanner.CameraAccessDenied) {
        return ItemScanResult(Item(), ItemRequestError.CAMERA_PERMISSIONS);
      } else {
        return ItemScanResult(Item(), ItemRequestError.UNKNOWN);
      }
    } on FormatException {
      return ItemScanResult(Item(), ItemRequestError.BACK_PRESSED);
    } catch (ex) {
      return ItemScanResult(Item(), ItemRequestError.UNKNOWN);
    }

    await Future.delayed(Duration(seconds: 3));

    var item = _parseItem(code);

    if (item == null) {
      return ItemScanResult(Item(), ItemRequestError.PARSING);
    }

    return ItemScanResult(_parseItem(code), null);
  }

  Item _parseItem(String code) {
    try {
      var itemSpec = code.split(';');
      var result = Item();
      result.name = itemSpec[0];
      result.type = itemSpec[1];
      result.photo = itemSpec[2];
      result.host = itemSpec[3];
      result.location = itemSpec[4];
      result.description = itemSpec[5];
      return result;
    } catch (ex) {
      return null;
    }
  }
}
