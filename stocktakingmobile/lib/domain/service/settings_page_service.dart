import 'package:stocktakingmobile/domain/model/user.dart';

abstract class SettingsPageService {
  User getUser();
  Future<String> getServerUrl();
  Future<bool> signOut();
  saveServerUrl(String url);
}
