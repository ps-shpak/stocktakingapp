import 'package:stocktakingmobile/domain/model/item.dart';

enum ItemRequestError {
  UNKNOWN,
  BACK_PRESSED,
  CAMERA_PERMISSIONS,
  CONNECTION,
  PARSING
}

class ItemScanResult {
  ItemScanResult(this.item, this.error);

  ItemRequestError error;
  Item item;
}
