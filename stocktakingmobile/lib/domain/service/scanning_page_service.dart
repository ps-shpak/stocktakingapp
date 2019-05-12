import 'package:stocktakingmobile/domain/model/item_request_result.dart';
import 'package:stocktakingmobile/domain/model/qr_code_scan_result.dart';

abstract class ScanningPageService {
  Future<QRCodeScanResult> scanCode();
  Future<ItemRequestResult> requestItem(String url);
}
