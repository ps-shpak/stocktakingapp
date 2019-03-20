import 'package:flutter/widgets.dart';

abstract class ScanningPageNavigator {
  Future<String> openScan();
  openSettings(BuildContext context);
}
