import 'package:flutter/widgets.dart';
import 'package:stocktakingmobile/domain/model/item.dart';

abstract class ScanningPageNavigator {
  openSettings(BuildContext context);
  openItem(BuildContext context, Item item);
}
