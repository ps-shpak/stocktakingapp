import 'package:stocktakingmobile/domain/model/user.dart';

abstract class SettingsPageService {
  User getUser();
  Future<bool> signOut();
}
