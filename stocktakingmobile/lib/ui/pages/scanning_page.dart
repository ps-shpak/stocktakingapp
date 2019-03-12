import 'package:flutter/widgets.dart';
import 'package:stocktakingmobile/state/scanning_page_state.dart';

class ScanningPage extends StatefulWidget {
  ScanningPage({initialState: ScanningPageState})
      : _state = initialState,
        super();

  final ScanningPageState _state;

  @override
  State<StatefulWidget> createState() => _state;
}
