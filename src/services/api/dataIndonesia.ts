import axios from "axios";

export type DataIndonesia = {
  id: string;
  nama: string;
};

type regionType = "provinsi" | "kabupaten" | "kecamatan";

export const fetchDataIndonesia = async (
  type: regionType = "provinsi",
  id: string = ""
): Promise<DataIndonesia[]> => {
  try {
    // fetch using axios
    const response = await axios.get<DataIndonesia[]>(
      type === "provinsi"
        ? `https://harisalghifary.github.io/data-indonesia/${type}.json`
        : `https://harisalghifary.github.io/data-indonesia/${type}/${id}.json`
    );
    return response.data;
  } catch (error) {
    return [];
  }
};
