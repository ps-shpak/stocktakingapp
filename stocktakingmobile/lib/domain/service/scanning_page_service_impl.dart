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
    } on FormatException {} catch (ex) {
      return ItemScanResult(Item(), ItemRequestError.UNKNOWN);
    }

    await Future.delayed(Duration(seconds: 3));
    return ItemScanResult(Item(), null);
  }
}
