import 'package:stocktakingmobile/domain/model/item_request_result.dart';

abstract class ScanningPageService {
  Future<ItemScanResult> scanCode();
}
