import * as React from 'react';

export default function ConfigTab() {
        return {
        const { strings } = this.props;
        const { cols } = this.state;
        const setConfig = config => {
            this.setState({
                cols: cols.map((col) => {
                    let item = col;
                    if (col.type === config.type) {
                        const { question, color, type } = config;
                        item = {
                            question,
                            color,
                            type
                        };
                    }
                    return item;
                })
            });
        };
        const saveConfig = () => {
            this.props.updateCols(this.state.cols);
        };
        const addConfig = () => {
            this.setState({
                cols: [...cols, {
                    question: 'Add a question',
                    color: '#000000',
                    type: ''
                }]
            });
        };
        const deleteConfig = (type) => {
            this.setState({
                cols: cols.filter(col => col.type !== type)
            });
        };
        return (
            <Tab label={ strings.configureBoardTab.header } key="configureBoard">
                <div>
                    {cols.map((row, i) => (
                        <ConfigRow key={i}
                          type={row.type}
                          question={row.question}
                          color={row.color}
                          setConfig={setConfig}
                          deleteConfig={deleteConfig}
                        />
                    ))}
                    <Button
                      label={ strings.configureBoardTab.save }
                      accent
                      raised
                      onClick={ saveConfig }
                    />
                    <Button
                      label={ strings.configureBoardTab.add }
                      raised
                      onClick={ addConfig }
                    />
                </div>
            </Tab>
        );
    }
}