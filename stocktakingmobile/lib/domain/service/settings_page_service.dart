import 'package:stocktakingmobile/domain/model/user.dart';

abstract class SettingsPageService {
  Future<User> getUser();
  Future<bool> signOut();
}
