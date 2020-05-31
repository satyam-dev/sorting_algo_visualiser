import * as React from "react";
import Bar from "./common/bar";
import { BarTypesEnum } from "../enums/barTypeEnum";
import * as _ from "lodash";
import Header from "./header";
import { AlgoEnum } from "../enums/algoEnums";
import { bubbleSort, selectionSort, insertionSort } from "../utils/algorithms";
import { generateRandomArray } from "../utils/utils";
import { BarColorEnum } from "../enums/barColorEnum";
export interface VisualiserProps {}

export interface VisualiserState {
  original: number[];
  sorted: number[];
  selectedAlgo: AlgoEnum;
  algorithms: AlgoEnum[];
  swapElements: number[];
}

class Visualiser extends React.Component<VisualiserProps, VisualiserState> {
  state = {
    original: generateRandomArray({ from: 5, to: 99 }, 25),
    sorted: [],
    selectedAlgo: AlgoEnum.BubbleSort,
    algorithms: [
      AlgoEnum.BubbleSort,
      AlgoEnum.InsertionSort,
      AlgoEnum.MergeSort,
      AlgoEnum.QuickSort,
      AlgoEnum.SelectionSort,
    ],
    swapElements: [],
  };
  render() {
    const { original, algorithms, selectedAlgo } = this.state;
    return (
      <React.Fragment>
        <Header
          onRefresh={this.handleRefresh}
          onSpeedChange={this.handleSpeedChange}
          algorithms={algorithms}
          selectedAlgo={selectedAlgo}
          onChange={this.handleAlgoChange}
          onActivate={() => this.handleActivate()}
        />
        <div
          className="container d-flex flex-row pt-1"
          style={{ height: "calc(100vh - 100px)" }}
        >
          {original.map((a) => (
            <Bar
              color={this.getBarColor(a)}
              height={this.getBarHeight(a)}
              width={this.getBarWidth(a)}
              types={BarTypesEnum.CrossLine}
              value={a}
              showValue={original.length <= 30}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
  getBarHeight(value: number): string {
    const largest = _.max(this.state.original) || value;
    return `${(value / largest) * 100}%`;
  }
  getBarWidth(value: number) {
    return `${100 / this.state.original.length}%`;
  }
  getBarColor(a: number): BarColorEnum {
    if (_.indexOf(this.state.swapElements, a) > -1) {
      return BarColorEnum.Swap;
    }
    if (_.indexOf(this.state.sorted, a) > -1) {
      return BarColorEnum.Sorted;
    }
    return BarColorEnum.Default;
  }
  handleAlgoChange = (algo: AlgoEnum) => {
    this.setState({ selectedAlgo: algo });
  };
  handleSpeedChange = (e: any) => {
    const count = +e.currentTarget.value;
    this.setState({
      original: generateRandomArray({ from: 10, to: 99 }, count),
      sorted: [],
    });
  };
  handleRefresh = () => {
    this.setState({
      original: generateRandomArray(
        { from: 10, to: 99 },
        this.state.original.length
      ),
      sorted: [],
    });
  };

  handleActivate() {
    switch (this.state.selectedAlgo) {
      case AlgoEnum.BubbleSort:
        bubbleSort(this.state.original).subscribe((res) => {
          if (res.items) {
            this.setState({ original: res.items });
          }
          if (res.swapElements) {
            this.setState({ swapElements: res.swapElements });
          }
          if (res.sorted) {
            let sorted: number[] = [...this.state.sorted, ...res.sorted];
            this.setState({ sorted });
          }
        });
        return;
      case AlgoEnum.SelectionSort:
        selectionSort(this.state.original).subscribe((res) => {
          if (res.items) {
            this.setState({ original: res.items });
          }
          if (res.swapElements) {
            this.setState({ swapElements: res.swapElements });
          }
          if (res.sorted) {
            let sorted: number[] = [...this.state.sorted, ...res.sorted];
            this.setState({ sorted });
          }
        });
        return;
      case AlgoEnum.InsertionSort:
        insertionSort(this.state.original).subscribe((res) => {
          if (res.items) {
            this.setState({ original: res.items });
          }
          if (res.swapElements) {
            this.setState({ swapElements: res.swapElements });
          }
          if (res.sorted) {
            let sorted: number[] = [...this.state.sorted, ...res.sorted];
            this.setState({ sorted });
          }
        });
        return;
      default:
        return;
    }
  }
}

export default Visualiser;
