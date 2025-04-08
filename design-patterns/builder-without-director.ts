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

const mapBuilder = new GraphWidgetBuilderImpl();
const barGraphBuilder = new GraphWidgetBuilderImpl();

const mapWidget = mapBuilder
  .setType('graph')
  .setSubType('choropleth_map')
  .setDimensionIds([COUNTRY_BREAKDOWN])
  .getWidget();

const barGraphWidget = barGraphBuilder
  .setType('graph')
  .setSubType('bar')
  .setShowGraphLabel(true)
  .setDimensionIds([DEFAULT_BREAKDOWN])
  .getWidget();

console.log(mapWidget);
console.log(barGraphWidget);
