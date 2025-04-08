const DEFAULT_BREAKDOWN = 'channel';
const COUNTRY_BREAKDOWN = 'country';

class GraphWidget {
  type: string;
  subType: string;
  dimensionIds: string[];
  showGraphLabel?: boolean;
}

interface GraphWidgetBuilder {
  setType(type: string): this;
  setSubType(subType: string): this;
  setDimensionIds(dimensionIds: string[]): this;
  setShowGraphLabel(showGraphLabel: boolean): this;
  getWidget(): GraphWidget;
}

class GraphWidgetBuilderImpl implements GraphWidgetBuilder {
  private widget: GraphWidget;

  constructor() {
    this.widget = new GraphWidget();
  }

  setType(type: string): this {
    this.widget.type = type;
    return this;
  }

  setSubType(subType: string): this {
    this.widget.subType = subType;
    return this;
  }

  setDimensionIds(dimensionIds: string[]): this {
    this.widget.dimensionIds = dimensionIds;
    return this;
  }

  setShowGraphLabel(showGraphLabel: boolean): this {
    this.widget.showGraphLabel = showGraphLabel;
    return this;
  }

  getWidget(): GraphWidget {
    return this.widget;
  }
}

// // Director number 1
// class GraphWidgetDirector {
//   static buildMapWidget(builder: GraphWidgetBuilder): GraphWidget {
//     return builder
//       .setType('graph')
//       .setSubType('choropleth_map')
//       .setDimensionIds([COUNTRY_BREAKDOWN])
//       .getWidget();
//   }

//   static buildBarGraphWidget(builder: GraphWidgetBuilder): GraphWidget {
//     return builder
//       .setType('graph')
//       .setSubType('bar')
//       .setShowGraphLabel(true)
//       .setDimensionIds([DEFAULT_BREAKDOWN])
//       .getWidget();
//   }
// }

// const mapBuilder = new GraphWidgetBuilderImpl();
// const mapWidget = GraphWidgetDirector.buildMapWidget(mapBuilder);

// const barGraphBuilder = new GraphWidgetBuilderImpl();
// const barGraphWidget = GraphWidgetDirector.buildBarGraphWidget(barGraphBuilder);

// console.log(mapWidget);
// console.log(barGraphWidget);

// Director number 2
interface WidgetDirector {
  makeWidget(): GraphWidget;
}

class ChoroplethMapDirector implements WidgetDirector {
  makeWidget(): GraphWidget {
    return new GraphWidgetBuilderImpl()
      .setType('graph')
      .setSubType('choropleth_map')
      .setDimensionIds([COUNTRY_BREAKDOWN])
      .getWidget();
  }
}

class BarGraphDirector implements WidgetDirector {
  makeWidget(): GraphWidget {
    return new GraphWidgetBuilderImpl()
      .setType('graph')
      .setSubType('bar')
      .setShowGraphLabel(true)
      .setDimensionIds([DEFAULT_BREAKDOWN])
      .getWidget();
  }
}

const choroplethMapDirector = new ChoroplethMapDirector();
const barGraphDirector = new BarGraphDirector();

const mapWidget = choroplethMapDirector.makeWidget();
const barGraphWidget = barGraphDirector.makeWidget();

console.log(mapWidget);
console.log(barGraphWidget);
