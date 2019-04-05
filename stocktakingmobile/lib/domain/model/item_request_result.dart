import 'package:stocktakingmobile/domain/model/item.dart';

enum ItemRequestError { UNKNOWN, CAMERA_PERMISSIONS, CONNECTION }

class ItemScanResult {
  ItemScanResult(this.item, this.error);

  ItemRequestError error;
  Item item;
}
