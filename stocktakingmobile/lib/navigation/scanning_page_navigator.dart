import 'package:flutter/widgets.dart';
import 'package:stocktakingmobile/domain/model/qr_code_Item.dart';

abstract class ScanningPageNavigator {
  openSettings(BuildContext context);
  openItem(BuildContext context, QRCodeItem item);
}
