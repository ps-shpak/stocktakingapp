import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_svg/svg.dart';
import 'package:stocktakingmobile/ui/widget/picker_body.dart';

class ScanPickerBodyState extends State<ScanPickerBody> {
  ScanPickerBodyState({onStartScan: VoidCallback})
      : assert(onStartScan != null),
        _onStartScanListener = onStartScan,
        super();

  bool isScanning = false;

  final _iconClickToScan = 'assets/ic_click_to_scan.svg';
  VoidCallback _onStartScanListener;

  @override
  Widget build(BuildContext context) {
    Widget body;

    if (isScanning) {
      body = _buildWaitingAnimation();
    } else {
      body = _buildStartButton();
    }

    return ConstrainedBox(
      constraints: const BoxConstraints.expand(),
      child: body,
    );
  }

  Widget _buildStartButton() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: <Widget>[
        _buildGuide(),
        _buildButton(),
      ],
    );
  }

  Widget _buildGuide() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        SvgPicture.asset(
          "assets/ic_scan_example_0.svg",
          width: 64,
          height: 64,
        ),
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 12),
          child: Icon(Icons.arrow_forward_ios, color: Colors.black38,),
        ),
        SvgPicture.asset(
          "assets/ic_scan_example_1.svg",
          width: 64,
          height: 64,
        ),
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 12),
          child: Icon(Icons.arrow_forward_ios, color: Colors.black38,),
        ),
        SvgPicture.asset(
          "assets/ic_scan_example_2.svg",
          width: 64,
          height: 64,
        ),
      ],
    );
  }

  Widget _buildButton() {
    return RaisedButton(
      color: Colors.orange,
      shape: CircleBorder(),
      child: Padding(
        padding: EdgeInsets.all(32),
        child: SvgPicture.asset(
          _iconClickToScan,
          width: 72,
          height: 72,
        ),
      ),
      onPressed: _startScan,
    );
  }

  Widget _buildWaitingAnimation() {
    return Align(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          CircularProgressIndicator(),
          Padding(
            padding: EdgeInsets.only(top: 16),
            child: Text(
              'Пожалуйста, подождите...',
              style: TextStyle(),
            ),
          ),
        ],
      ),
    );
  }

  _startScan() {
    if (isScanning) {
      return;
    }

    _onStartScanListener();
  }
}
