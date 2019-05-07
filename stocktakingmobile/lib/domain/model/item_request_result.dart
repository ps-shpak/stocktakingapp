import 'package:stocktakingmobile/domain/model/item.dart';

enum ItemRequestError {
  UNKNOWN,
  CONNECTION,
  PARSING
}

class ItemRequestResult {
  ItemRequestResult(this.item, this.error);

  ItemRequestError error;
  Item item;
}
