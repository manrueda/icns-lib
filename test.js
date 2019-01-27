import fs from 'fs';
import crypto from 'crypto';
import test from 'ava';
import icns from './lib';

const bufferHash = buffer => {
	const hash = crypto.createHash('sha256');
	hash.write(buffer);
	return hash.digest('hex');
};

const expectedHashed = {
	// eslint-disable-next-line key-spacing
	'TOC ' : '8df1bf8ec0a150658a77a19691694786d09daff43b7cf1ed6deef3c1891c8055',
	is32: 'a137f7f598f38504c7ea658d95cb8162f7f7c14d82529ea1f8c9e621f2c76404',
	s8mk: 'a454b122a1671ef6dfddad52d5ab91bf54171863115236cd62072bf517384501',
	il32: 'ac2a2aa4cfe01ce2ad6235cbd34d179c4c1e1fa213091ca343e1bfac677724ef',
	l8mk: '586c5bde1279c3964b8ed18e582a9922ac27dedf870d64a3a805db1c7bdfbf30',
	ih32: '8058364d77ffb4bde705b73e838a236063b2f77bd6657ec0646af0d22ac2aaa7',
	h8mk: 'cac4e219ab02136f4df90b06ccfc2b58f8456fd3b30738605f77cf2bc9a46f91',
	it32: '5bb42bf18cc5262bbcd52dd26c7c5785da000810ccc4e4b6b2f4695538b3855c',
	t8mk: 'f25ee8038feedb86e18a49deb0a92094e175588dd51e7098fdcba58389af989e',
	ic13: '2f2b63c1262d5486145b82d103a26d7dc6afc415f8e3385f9c639b2a55e7a9ba',
	ic08: '5f53040e64385e454f4648b830a6b7ebf0d4f92673a4098397de7a556a7f5757',
	ic14: '1f09ac882ed84b64e8673b167eb3299d6fa23e9569fe2f3e328a82049a535744',
	ic09: 'b1a3928dd1793ea9cc8b554a9a9376131236e827d605529068522abf2622c461',
	ic10: 'be4fa85a3265baddad6ba25ce53b6f2f745a263d62fd4811ddeddb9b9c481a5b'
};

test('main', t => {
	t.plan(28);
	const buffer = fs.readFileSync('./fixture/test.icns');

	const icons = icns.parse(buffer);

	Object.keys(icons).forEach(type => {
		t.is(bufferHash(icons[type]), expectedHashed[type], 'Invalid buffer hash');
		t.true((icons[type] instanceof Buffer), `The type ${type} is not a buffer`);
	});
});
