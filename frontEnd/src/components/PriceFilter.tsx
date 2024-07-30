
type Props = {
    selectedPrice?: number
    onChange: (value?: number) => void

}


const PriceFilter = ({selectedPrice, onChange}: Props) => {
    return (
        <div className="pb-10">
            <h4 className="text-md font-semibold mb-2">Max Price</h4>
            <select
                className="w-full border border-slate-300 p-2 rounded-lg"
                value={selectedPrice}
                onChange={(e) => onChange(e.target.value? parseInt(e.target.value) : undefined)}
            >
                <option value="">Select Max Price</option>
                {[5, 100, 200, 300, 500].map((price, index) => (
                    <option key={index} value={price}>{price}</option>
                ))}
            </select>
        </div>
    )
}


export default PriceFilter