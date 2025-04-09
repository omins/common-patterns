const DEFAULT_BREAKDOWN = 'channel';
const COUNTRY_BREAKDOWN = 'country';

class GraphWidget {
  type: string = 'graph';
  subType: string;
  dimensionIds: string[];
  showGraphLabel?: boolean;
}

interface GraphWidgetBuilder {
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
  .setSubType('choropleth_map')
  .setDimensionIds([COUNTRY_BREAKDOWN])
  .getWidget();

const barGraphWidget = barGraphBuilder
  .setSubType('bar')
  .setShowGraphLabel(true)
  .setDimensionIds([DEFAULT_BREAKDOWN])
  .getWidget();

console.log(mapWidget);
console.log(barGraphWidget);
