import 'package:barcode_scan/barcode_scan.dart';
import 'package:stocktakingmobile/domain/service/scanning_page_service.dart';

class ScanningPageServiceImpl implements ScanningPageService {
  @override
  Future<String> scanCode() {
    return BarcodeScanner.scan();
  }
}
