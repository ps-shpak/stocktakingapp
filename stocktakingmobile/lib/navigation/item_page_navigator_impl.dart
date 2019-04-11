import 'package:flutter/widgets.dart';
import 'package:stocktakingmobile/navigation/item_page_navigator.dart';

class ItemPageNavigatorImpl extends ItemPageNavigator {
  @override
  close(BuildContext context) {
    if (Navigator.canPop(context)) {
      Navigator.pop(context);
    }
  }
}
