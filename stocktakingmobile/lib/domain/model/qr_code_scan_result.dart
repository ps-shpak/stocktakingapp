import 'package:stocktakingmobile/domain/model/qr_code_Item.dart';

enum QRCodeScanError {
  UNKNOWN,
  BACK_PRESSED,
  CAMERA_PERMISSIONS,
  PARSING
}

class QRCodeScanResult {
  QRCodeScanResult(this.item, this.error);

  QRCodeScanError error;
  QRCodeItem item;
}
