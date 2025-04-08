export const DEFAULT_BREAKDOWN = 'channel';
export const COUNTRY_BREAKDOWN = 'country';

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

/**
 * Director 1
 */
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

/**
 * Director 2
 */
interface WidgetDirector {
  makeWidget(): GraphWidget;
}

export class ChoroplethMapDirector implements WidgetDirector {
  makeWidget(): GraphWidget {
    return new GraphWidgetBuilderImpl()
      .setType('graph')
      .setSubType('choropleth_map')
      .setDimensionIds([COUNTRY_BREAKDOWN])
      .getWidget();
  }
}

export class BarGraphDirector implements WidgetDirector {
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

/**
 * Without builder pattern
 */

class GraphWidgetWidget {
  type: string;
  subType: string;
  dimensionIds: string[];
  showGraphLabel?: boolean;

  constructor(
    type: string,
    subType: string,
    dimensionIds: string[],
    showGraphLabel?: boolean
  ) {
    this.type = type;
    this.subType = subType;
    this.dimensionIds = dimensionIds;
    this.showGraphLabel = showGraphLabel;
  }
}

const mapWidgetWithoutBuilder = new GraphWidgetWidget(
  'graph',
  'choropleth_map',
  [COUNTRY_BREAKDOWN]
);
const barGraphWidgetWithoutBuilder = new GraphWidgetWidget(
  'graph',
  'bar',
  [DEFAULT_BREAKDOWN],
  true
);
console.log(mapWidgetWithoutBuilder);
console.log(barGraphWidgetWithoutBuilder);
