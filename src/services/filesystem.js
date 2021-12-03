import * as FileSystem from 'expo-file-system';

const contactsDirectory = `${FileSystem.documentDirectory}contacts`;

const resetDirectory = async () => {
  await FileSystem.deleteAsync(contactsDirectory);
}

const onException = (cb) => {
	try {return cb();} 
  catch (err) {console.error(err);}
};

const setupDirectory = async () => {
	const dir = await FileSystem.getInfoAsync(contactsDirectory);
	if (!dir.exists) {
		await FileSystem.makeDirectoryAsync(contactsDirectory);
	}
};

export function validFilename(str) {
	const newString = str.replace(/\s/g, '')
	return newString.replace(/[^A-Za-z0-9\s-]/g, '');
};

export const writeToFile = async (file, newLocation) => {
	onException(() => FileSystem.writeAsStringAsync(newLocation, file));
  console.log("New contact added to filesystem")
};

export const addContact = async contactLocation => {
  await setupDirectory();

	const fileName = validFilename(contactLocation.name);

	const contJSON = JSON.stringify(contactLocation);
    const folderSplit = contJSON.split('/');
    const UUID = folderSplit[folderSplit.length - 1].slice(0, -6);
    contactLocation["id"] = fileName + "-" + UUID;
    const mainContJSON = JSON.stringify(contactLocation);

	await onException(() => writeToFile(mainContJSON, `${contactsDirectory}/${fileName}-${UUID}.json`));
};

const loadContact = async fileName => {
  return await FileSystem.readAsStringAsync(`${contactsDirectory}/${fileName}`, {
    encoding: FileSystem.EncodingType.base64
  });
}

export const getAllContacts = async () => {
  await setupDirectory();
  const result = await onException(() => FileSystem.readDirectoryAsync(contactsDirectory)); // All filenames in FileSystem
	return Promise.all(result.map(async (fileName) => {
    return(JSON.parse(await loadContact(fileName)));
	}));
}