import 'package:flutter/widgets.dart';

abstract class ScanningPageNavigator {
  Future<String> openScan();
  void openSettings(BuildContext context);
}
