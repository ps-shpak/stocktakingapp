import 'package:flutter/widgets.dart';
import 'package:stocktakingmobile/state/picker_body_state.dart';

class ScanPickerBody extends StatefulWidget {
  ScanPickerBody({ScanPickerBodyState state})
      : assert(state != null),
      _state = state;

  final ScanPickerBodyState _state;

  @override
  State<StatefulWidget> createState() {
    return _state;
  }
}
